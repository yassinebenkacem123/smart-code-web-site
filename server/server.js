// 📁 server.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const coursRoutes = require('./routes/coursRoutes');
const chapitreRoutes = require('./routes/chapitreRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reponseRoutes = require('./routes/reponseRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const progressionRoutes = require('./routes/progressionRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const professorRoutes = require('./routes/professorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/chapitres', chapitreRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reponses', reponseRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/progression', progressionRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/enseignants', professorRoutes);
app.use('/api/etudiant', studentRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
