const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemMakananController');
const uploadProduk = require('../middleware/uploadProduk');
const verifyToken = require('../middleware/auth');

//  Create Product
router.post('/', verifyToken, uploadProduk.single('photo'), itemController.createItem);

// Get Data  Berdasarkan Restoran 
router.get('/itemMakananAll', itemController.getAllItems);

router.get('/restoran/:restoran_id', itemController.getItemsByRestoran);
// Endpoint untuk pencarian dan penyaringan item makanan
router.get('/search', itemController.searchAndFilterItems);
// Update
router.put('/:id', verifyToken, uploadProduk.single('photo'), itemController.updateItem);

// Delete
router.delete('/:id', verifyToken, itemController.deleteItem);


module.exports = router;
