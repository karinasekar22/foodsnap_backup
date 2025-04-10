const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');
const checkRole = require('../middleware/role');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Hanya user terautentikasi
router.get('/profile', verifyToken, authController.getProfile);

// Reset password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// ⛔ Akses khusus: hanya admin
router.get('/admin/dashboard', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'Selamat datang, Admin!' });
});

// ⛔ Akses khusus: hanya UMKM
router.get('/umkm/dashboard', verifyToken, checkRole('umkm'), (req, res) => {
  res.json({ message: 'Selamat datang UMKM, ayo kelola tokomu!' });
});

module.exports = router;
