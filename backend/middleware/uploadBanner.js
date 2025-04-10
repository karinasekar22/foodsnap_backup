const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/banner');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-banner' + path.extname(file.originalname));
  }
});

const uploadBanner = multer({ storage });

module.exports = uploadBanner;
