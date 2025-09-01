// 📁 controllers/notificationController.js
const pool = require('../config/db');
// i will use it in the professor statistics page to show the notifications
// ✅ Ajouter une notification (admin)

exports.ajouterNotification = async (req, res) => {
  const { etudiant_email, titre, message } = req.body;

  try {
    let etudiant_id = null;

    // Search for the student ID based on the provided email
    if (etudiant_email) {
      const [rows] = await pool.execute(
        `SELECT id FROM etudiants WHERE email = ?`,
        [etudiant_email]
      );

      if (rows.length > 0) {
        etudiant_id = rows[0].id; // Get the student ID
      } else {
        return res.status(404).json({
          success: false,
          message: "Étudiant avec cet email non trouvé",
        });
      }
    }

    // Insert the notification
    await pool.execute(
      `INSERT INTO notifications (etudiant_id, titre, message) VALUES (?, ?, ?)`,
      [etudiant_id || null, titre, message]
    );

    res.status(201).json({
      success: true,
      message: etudiant_id
        ? `Notification envoyée à l'étudiant avec l'email ${etudiant_email}`
        : "Notification envoyée à tous les étudiants",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: err.message,
    });
  }
};

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
