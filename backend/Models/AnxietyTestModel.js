const mongoose = require('mongoose');

const anxietyTestResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username:{
    type: String,
    required: true
  },
  email:{
     type: String,
     required: true
  },
  score: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

const AnxietyTestResult = mongoose.model('AnxietyTestResult', anxietyTestResultSchema);

module.exports = AnxietyTestResult;