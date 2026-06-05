const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  filename: String,
  path: String,
  url: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  size: Number,
  mimeType: String,
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Upload', UploadSchema);
