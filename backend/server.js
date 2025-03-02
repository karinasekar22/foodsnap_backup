require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes (contoh sederhana)
app.use('/api/auth', require('./routes/auth'));     // Login & Register
app.use('/api/photos', require('./routes/photos'));   // Upload Foto dan integrasi Google Vision
app.use('/api/comments', require('./routes/comments'));// Comments

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
