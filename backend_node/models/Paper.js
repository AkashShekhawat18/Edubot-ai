const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  marks: Number,
  difficulty: String,
  choices: [String],
  answer: mongoose.Schema.Types.Mixed,
});

const PaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  topic: String,
  difficulty: String,
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [QuestionSchema],
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('Paper', PaperSchema);
