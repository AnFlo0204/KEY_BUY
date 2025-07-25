const express = require('express');
const router = express.Router();
const Key = require('../models/Key');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// POST /api/key/redeem
router.post('/redeem', async (req, res) => {
  try {
    const { account_code, key_code } = req.body;
    if (!account_code || !key_code) {
      return res.status(400).json({ message: 'Thiếu thông tin tài khoản hoặc key.' });
    }
    const user = await User.findOne({ account_code });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    const key = await Key.findOne({ key_code });
    if (!key || key.is_used) {
      return res.status(400).json({ message: 'Key không hợp lệ hoặc đã sử dụng.' });
    }
    // Đánh dấu key đã sử dụng
    key.is_used = true;
    key.used_by = user._id;
    key.used_at = new Date();
    await key.save();
    // Ghi lịch sử giao dịch
    await Transaction.create({
      user_id: user._id,
      type: 'key_redeem',
      amount: 0,
      key_id: key._id,
      created_at: new Date(),
      note: 'Khách hàng nhập key và nhận file/link/note.'
    });
    // Xóa key khỏi hệ thống (nếu muốn xóa vật lý)
    await Key.deleteOne({ _id: key._id });
    // Trả về file/link/note
    res.json({ type: key.type, value: key.value });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 