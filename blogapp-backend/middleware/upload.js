const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../uploads'); // Always outside frontend

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
