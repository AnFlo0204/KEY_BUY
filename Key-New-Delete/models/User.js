const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  account_code: { type: String, required: true, unique: true }, // 9 số
  password: { type: String, required: true }, // hash 8 số
  balance: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date }
});

module.exports = mongoose.model('User', userSchema); 