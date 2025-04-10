const Restoran = require('../models/Restoran');

// createRestoran
exports.createRestoran = async (req, res) => {
    try {
      const { restaurant_name, business_info, ppn, discount, open_at, closed_at } = req.body;
      const user_id = req.user.id;
  
      const banner_url = req.file ? `/uploads/banner/${req.file.filename}` : null;
  
      const restoran = await Restoran.create({
        user_id,
        restaurant_name,
        business_info,
        ppn,
        discount,
        open_at,
        closed_at,
        banner_url
      });
  
      res.status(201).json({ message: 'Restoran berhasil dibuat', restoran });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Gagal membuat restoran' });
    }
  };
  
  // updateRestoran
  exports.updateRestoran = async (req, res) => {
    try {
      const { id } = req.params;
      const restoran = await Restoran.findOne({ where: { id, user_id: req.user.id } });
      if (!restoran) return res.status(404).json({ message: 'Restoran tidak ditemukan' });
  
      const banner_url = req.file ? `/uploads/banner/${req.file.filename}` : restoran.banner_url;
  
      await restoran.update({
        ...req.body,
        banner_url
      });
  
      res.json({ message: 'Restoran diperbarui', restoran });
    } catch (err) {
      res.status(500).json({ message: 'Gagal memperbarui restoran' });
    }
  };
  
exports.getRestoransByUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const restorans = await Restoran.findAll({ where: { user_id } });
    res.status(200).json(restorans);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data restoran' });
  }
};

  
exports.deleteRestoran = async (req, res) => {
  try {
    const { id } = req.params;
    const restoran = await Restoran.findOne({ where: { id, user_id: req.user.id } });
    if (!restoran) return res.status(404).json({ message: 'Restoran tidak ditemukan' });

    await restoran.destroy();
    res.json({ message: 'Restoran dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus restoran' });
  }
};
