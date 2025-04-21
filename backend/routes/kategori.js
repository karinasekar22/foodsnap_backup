// routes/kategori.js
const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');

router.post('/', kategoriController.createKategori); // POST untuk menambah kategori

module.exports = router;
