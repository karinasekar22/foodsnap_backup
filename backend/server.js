const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const path = require('path');

const app = express();
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// ✅ Ini tambahan untuk akses file upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .then(() => sequelize.sync({ alter: true }))
  .catch(err => console.error('DB error:', err));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restoran', require('./routes/restoran'));
app.use('/api/produk', require('./routes/itemMakanan')); // kalau udah dibuat

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
