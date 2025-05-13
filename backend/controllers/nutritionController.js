const Nutrition = require('../models/Nutrition');

exports.addNutrition = async (req, res) => {
  try {
    const {
      item_makanan_id,
      calories,
      fat,
      sugar,
      protein,
      carbohydrates,
      fiber,
    } = req.body;

    const newNutrition = await Nutrition.create({
      item_makanan_id,
      calories,
      fat,
      sugar,
      protein,
      carbohydrates,
      fiber,
    });

    res.status(201).json({
      message: 'Nutrition data added successfully',
      data: newNutrition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add nutrition', error });
  }
};

exports.updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;

    const nutrition = await Nutrition.findByPk(id);
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition not found' });
    }

    const updated = await nutrition.update(req.body);

    res.json({
      message: 'Nutrition updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update nutrition', error });
  }
};

exports.getNutritionById = async (req, res) => {
  try {
    const { id } = req.params;

    const nutrition = await Nutrition.findByPk(id);
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition not found' });
    }

    res.json(nutrition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get nutrition', error });
  }
};

exports.getAllNutrition = async (req, res) => {
  try {
    const all = await Nutrition.findAll();
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch nutrition data', error });
  }
};