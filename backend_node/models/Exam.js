const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: String,
  startAt: Date,
  endAt: Date,
  online: { type: Boolean, default: true },
  classroom: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
