const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Loan', 'Repayment'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['On-time', 'Late', 'Missed'],
    required: true
  }
}, { _id: false });

const CreditScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  score: {
    type: Number,
    default: 500,
    min: 300,
    max: 900
  },
  history: [HistorySchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('CreditScore', CreditScoreSchema);