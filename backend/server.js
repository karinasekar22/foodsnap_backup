const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const path = require('path');
require('./models/associations');

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
app.use('/api/auth', require('./routes/auth')); // Authentification
app.use('/api/restoran', require('./routes/restoran')); // Toko/ UMKM (Resto)
app.use('/api/produk', require('./routes/itemMakanan')); // Produk / Item
app.use('/api/comments', require('./routes/comment')); // Comment And Review
app.use('/api/comments-detail', require('./routes/commentDetail')); // Comment And Replies
app.use('/api/wishlist', require('./routes/wishlistRoutes'));

// Serve static files dari folder uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/kategori', require('./routes/kategori'));
app.use('/api/nutrition', require('./routes/nutrition'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));