const express = require('express');
const multer = require('multer');
const path = require('path');
const Upload = require('../models/Upload');

const router = express.Router();

// Simple local storage for development
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: { message: 'file required' } });
  const doc = await Upload.create({
    filename: req.file.originalname,
    path: req.file.path,
    size: req.file.size,
    mimeType: req.file.mimetype,
  });
  res.status(201).json({ success: true, data: doc });
});

module.exports = router;
