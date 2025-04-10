const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
      const { username, email, password, role, address } = req.body;
  
      // Validasi input dasar
      if (!email || !username || !password) {
        console.log('Body' , req.body);
        return res.status(400).json({ message: 'Username, email, dan password wajib diisi' });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role,
        address
      });
  
      res.status(201).json({ message: 'Registrasi berhasil', user });
    } catch (err) {
        console.log('Request body:', req.body);

    //   console.error(err);
      res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
  };
  

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Email tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ message: 'Login berhasil', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });
  
      const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  
      // Kirim token via email di masa depan, sekarang kita balikin aja tokennya
      res.json({ message: 'Token reset password berhasil dibuat', resetToken });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password berhasil diubah' });
    } catch (err) {
      res.status(400).json({ message: 'Token tidak valid atau kadaluarsa' });
    }
  };
  

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
