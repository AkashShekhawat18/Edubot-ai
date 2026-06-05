const mongoose = require('mongoose');

const DoubtSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  count: { type: Number, default: 0 },
  examples: [String],
}, { timestamps: true });

module.exports = mongoose.model('Doubt', DoubtSchema);
