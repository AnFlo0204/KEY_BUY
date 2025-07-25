const mongoose = require('mongoose');

const adminSettingSchema = new mongoose.Schema({
  qr_code_image: { type: String },
  contact_link: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminSetting', adminSettingSchema); 