const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemMakananController');
const uploadProduk = require('../middleware/uploadProduk');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, uploadProduk.single('photo'), itemController.createItem);
router.get('/:restoran_id', itemController.getItemsByRestoran);
router.put('/:id', verifyToken, uploadProduk.single('photo'), itemController.updateItem);
router.delete('/:id', verifyToken, itemController.deleteItem);

module.exports = router;
