const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['recharge', 'purchase', 'key_redeem'], required: true },
  amount: { type: Number, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  key_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Key', default: null },
  created_at: { type: Date, default: Date.now },
  note: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema); 