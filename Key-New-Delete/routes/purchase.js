const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

// POST /api/purchase
router.post('/', async (req, res) => {
  try {
    const { account_code, product_id } = req.body;
    if (!account_code || !product_id) {
      return res.status(400).json({ message: 'Thiếu thông tin tài khoản hoặc sản phẩm.' });
    }
    const user = await User.findOne({ account_code });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    const product = await Product.findById(product_id);
    if (!product || product.status !== 'available') {
      return res.status(400).json({ message: 'Sản phẩm không tồn tại hoặc đã hết hàng.' });
    }
    if (user.balance < product.price) {
      return res.status(400).json({ message: 'Số dư không đủ.' });
    }
    user.balance -= product.price;
    await user.save();
    await Transaction.create({
      user_id: user._id,
      type: 'purchase',
      amount: -product.price,
      product_id: product._id,
      created_at: new Date(),
      note: 'Khách hàng mua sản phẩm.'
    });
    res.json({ type: product.type, value: product.file_or_link });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 