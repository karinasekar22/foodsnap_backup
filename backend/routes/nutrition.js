// routes/kategori.js
const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const verifyToken = require('../middleware/auth');


router.post('/', verifyToken, nutritionController.addNutrition);

router.put('/:id', nutritionController.updateNutrition);

router.get('/all', verifyToken , nutritionController.getAllNutrition);

router.get('/:id', verifyToken , nutritionController.getNutritionById);


module.exports = router;
