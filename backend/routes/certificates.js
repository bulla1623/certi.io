
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Certificate = require('../models/Certificate');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Controller functions
const { uploadExcel, getCertificateById, addManualCertificate } = require('../controllers/certificatesController');

// Routes
router.post('/upload', upload.single('file'), uploadExcel);
router.get('/:id', getCertificateById);
router.post('/add', addManualCertificate);

module.exports = router;