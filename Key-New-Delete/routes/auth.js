const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Hàm sinh mã 9 số
function generateAccountCode() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || !/^[0-9]{8}$/.test(password)) {
      return res.status(400).json({ message: 'Mật khẩu phải gồm đúng 8 số.' });
    }
    let account_code;
    let exist = true;
    while (exist) {
      account_code = generateAccountCode();
      exist = await User.findOne({ account_code });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ account_code, password: hash });
    res.json({ account_code });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { account_code, password } = req.body;
    if (!account_code || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin đăng nhập.' });
    }
    const user = await User.findOne({ account_code });
    if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Sai mật khẩu.' });
    user.last_login = new Date();
    await user.save();
    res.json({ account_code: user.account_code, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 