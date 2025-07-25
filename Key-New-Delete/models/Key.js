const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  key_code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['file', 'link', 'note'], required: true },
  value: { type: String, required: true }, // đường dẫn file, link, hoặc note
  is_used: { type: Boolean, default: false },
  used_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  used_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Key', keySchema); 