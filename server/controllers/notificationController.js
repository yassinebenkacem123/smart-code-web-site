// 📁 controllers/notificationController.js
const pool = require('../config/db');
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Initialisation Brevo (réutilisable)
let brevoClientInitialised = false;
function getBrevoEmailApi() {
  if (!brevoClientInitialised) {
    const client = SibApiV3Sdk.ApiClient.instance;
    if (!process.env.BREVO_API_KEY) {
      console.warn('[notification] BREVO_API_KEY manquant dans les variables d\'env');
    }
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY || '';
    brevoClientInitialised = true;
  }
  return new SibApiV3Sdk.TransactionalEmailsApi();
}

// ✅ Ajouter une notification & envoyer email
// Règles demandées:
// - Si etudiant_email fourni: envoyer seulement à cet étudiant.
// - Sinon: envoyer à TOUS les étudiants qui ont acheté (statut paiement = 'payé') AU MOINS un cours de l'enseignant connecté.
exports.ajouterNotification = async (req, res) => {
  const { etudiant_email, titre, message } = req.body || {};
  const enseignantId = req.user?.id; // l'expéditeur (enseignant connecté)

  if (!titre || !message) {
    return res.status(400).json({ success: false, message: 'Titre et message sont requis' });
  }

  try {
    let targets = [];
    const emailApi = getBrevoEmailApi();

    if (etudiant_email) {
      // Cible unique
      const [rows] = await pool.execute('SELECT id, email FROM etudiants WHERE email = ? LIMIT 1', [etudiant_email]);
      if (!rows.length) {
        return res.status(404).json({ success: false, message: "Étudiant avec cet email non trouvé" });
      }
      targets = rows.map(r => ({ id: r.id, email: r.email }));
    } else {
      // Tous les étudiants qui ont acheté un cours de cet enseignant
      // On sélectionne DISTINCT pour éviter les doublons si l'étudiant a plusieurs inscriptions
      const [rows] = await pool.execute(`
        SELECT DISTINCT e.id, e.email
        FROM inscriptions i
        INNER JOIN cours c ON i.cours_id = c.id
        INNER JOIN etudiants e ON i.etudiant_id = e.id
        WHERE c.enseignant_id = ?
          AND i.statut_paiement = 'payé'
      `, [enseignantId]);

      if (!rows.length) {
        return res.status(404).json({ success: false, message: "Aucun étudiant n'a acheté vos cours (ou aucun paiement confirmé)" });
      }
      targets = rows.map(r => ({ id: r.id, email: r.email }));
    }

    // 1. Insérer les notifications (une par étudiant) - si cible unique OU broadcast ciblé
    // (On n'utilise plus la notification 'globale' (etudiant_id NULL) car on veut restreindre aux acheteurs seulement)
    const insertValues = [];
    const params = [];
    targets.forEach(t => {
      insertValues.push('(?, ?, ?)');
      params.push(t.id, titre, message);
    });
    await pool.execute(`INSERT INTO notifications (etudiant_id, titre, message) VALUES ${insertValues.join(',')}`, params);

    // 2. Préparer l'email
    const subject = titre.length > 150 ? titre.slice(0, 147) + '...' : titre;
    const htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:16px;background:#f8f9fa;line-height:1.5;">
        <h2 style="color:#0d6efd;margin-top:0;">${escapeHtml(subject)}</h2>
        <p style="white-space:pre-line;color:#333;">${escapeHtml(message)}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="font-size:12px;color:#777;">Vous recevez cet email car vous êtes inscrit à au moins un cours de cet enseignant.</p>
      </div>
    `;
    const textContent = `${subject}\n\n${message}`;

    // 3. Envoi email
    // On essaie d'envoyer en un seul appel (Brevo accepte un tableau de destinataires)
    const toArray = targets.map(t => ({ email: t.email }));

    let emailResponse = null;
    try {
      emailResponse = await emailApi.sendTransacEmail({
        sender: { name: 'SmartCode', email: process.env.EMAIL_FROM || 'no-reply@example.com' },
        to: toArray,
        subject: subject,
        htmlContent,
        textContent,
        headers: {
          'X-SC-Notification': 'true'
        },
        tags: ['notification', 'enseignant-broadcast']
      });
    } catch (emailErr) {
      console.error('[notification] Erreur envoi email Brevo:', emailErr.message);
      // On ne rollback pas les notifications: elles restent visibles dans l'interface même si l'email a échoué
      return res.status(207).json({
        success: false,
        message: 'Notifications enregistrées mais échec de l\'envoi email',
        error: emailErr.message,
        recipients: targets.length
      });
    }

    return res.status(201).json({
      success: true,
      message: etudiant_email
        ? `Notification + email envoyés à l'étudiant ${etudiant_email}`
        : `Notification + email envoyés à ${targets.length} étudiants (acheteurs de vos cours)` ,
      recipients: targets.length,
      brevoMessageId: emailResponse?.messageId || null
    });
  } catch (err) {
    console.error('[notification] Erreur serveur:', err);
    return res.status(500).json({ success: false, message: 'Erreur serveur', error: err.message });
  }
};

// Utilitaire simple pour éviter l'injection HTML dans l'email
function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ✅ Voir les notifications (étudiant)
exports.getNotifications = async (req, res) => {
  const etudiant_id = req.user.id;
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM notifications WHERE etudiant_id = ? OR etudiant_id IS NULL ORDER BY date DESC`,
      [etudiant_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
