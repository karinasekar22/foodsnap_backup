const express = require('express');
const router = express.Router();
const restoranController = require('../controllers/restoranController');
const uploadBanner = require('../middleware/uploadBanner'); // untuk upload file
const auth = require('../middleware/auth');      // verifikasi JWT
const checkRole = require('../middleware/role'); // opsional: batasi ke UMKM

// ✅ Create restoran (dengan banner)
router.post(
  '/',
  auth,
  checkRole('umkm'), // aktifkan ini kalau hanya untuk role UMKM
  uploadBanner.single('banner'),
  restoranController.createRestoran
);

// ✅ Read restoran by user
router.get('/', auth, restoranController.getRestoransByUser);

// ✅ Update restoran (dengan banner)
router.put(
  '/:id',
  auth,
  uploadBanner.single('banner'),
  restoranController.updateRestoran
);

// ✅ Delete restoran
router.delete('/:id', auth, restoranController.deleteRestoran);

module.exports = router;
