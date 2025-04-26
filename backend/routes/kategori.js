// routes/kategori.js
const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');
const verifyToken = require('../middleware/auth');


router.post('/', verifyToken,  kategoriController.createKategori); // POST untuk menambah kategori

router.get('/AllCategory', verifyToken ,   kategoriController.getAllKategori); // POST untuk menambah kategori


module.exports = router;
