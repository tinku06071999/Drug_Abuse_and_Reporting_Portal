const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Meditation', 'Exercise', 'Sober', 'Sleep'] 
  },
  value: {
    type: Number,
    default:0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;