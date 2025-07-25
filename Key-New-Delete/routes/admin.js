const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// POST /api/admin/recharge
router.post('/recharge', async (req, res) => {
  try {
    const { account_code, amount } = req.body;
    if (!account_code || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Thiếu thông tin hoặc số tiền không hợp lệ.' });
    }
    const user = await User.findOne({ account_code });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    user.balance += amount;
    await user.save();
    await Transaction.create({
      user_id: user._id,
      type: 'recharge',
      amount: amount,
      created_at: new Date(),
      note: 'Admin nạp tiền cho khách hàng.'
    });
    res.json({ message: 'Nạp tiền thành công', balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 