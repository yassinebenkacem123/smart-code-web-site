const stripe = require('../config/stripe');
const pool = require('../config/db');

exports.createCheckoutSession = async (req, res) => {
  const { cours_id } = req.body;

  const etudiant_id = req.user.id;
  try {
    const [existing] = await pool.execute(
      'SELECT * FROM inscriptions WHERE etudiant_id = ? AND cours_id = ?',
      [etudiant_id, cours_id]
    );

    const [[cours]] = await pool.execute(
      'SELECT * FROM cours WHERE id = ?',
      [cours_id]
    );
    if (!cours) return res.status(404).json({ message: 'Cours non trouvé' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'MAD',
            product_data: {
              name: cours.titre,
            },
            unit_amount: parseInt(cours.prix * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONT_URL}/etudiant-dashboard/paiement-success?cours_id=${cours.id}`,
      cancel_url: `${process.env.FRONT_URL}/etudiant-dashboard/paiement-annule`,
      metadata: {
        etudiant_id,
        cours_id
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: `Erreur stripe ${err.message}`, error: err.message });
  }
};

exports.confirmerPaiementEtInscription = async (req, res) => {
  const { cours_id } = req.body;
  const etudiant_id = req.user.id;

  try {
    // Validate input
    if (!cours_id) {
      return res.status(400).json({ 
        success: false,
        message: 'ID du cours manquant.' 
      });
    }
    // Check if the student is already enrolled in the course
    const [existing] = await pool.execute(
      'SELECT * FROM inscriptions WHERE etudiant_id = ? AND cours_id = ?',
      [etudiant_id, cours_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Déjà inscrit à ce cours.' 
      });
    }

    // Insert the new enrollment
    await pool.execute(
      `INSERT INTO inscriptions (etudiant_id, cours_id, statut_paiement) VALUES (?, ?, 'payé')`,
      [etudiant_id, cours_id]
    );

    res.json({ 
      success: true,
      message: 'Paiement confirmé et étudiant inscrit.' 
    });
  } catch (err) {
    console.error('Error during payment confirmation:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la confirmation du paiement.',
      error: err.message 
    });
  }
};

