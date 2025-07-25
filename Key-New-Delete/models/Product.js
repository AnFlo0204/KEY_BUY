const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['acc_lienquan', 'acc_freefire', 'hack_freefire', 'hack_lienquan'], required: true },
  status: { type: String, enum: ['available', 'out_of_stock'], default: 'available' },
  file_or_link: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Product', productSchema); 