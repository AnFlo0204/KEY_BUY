const express = require('express');
const router = express.Router();
const AdminSetting = require('../models/AdminSetting');

// Lấy setting
router.get('/', async (req, res) => {
  try {
    let setting = await AdminSetting.findOne();
    if (!setting) setting = await AdminSetting.create({});
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Cập nhật QR code và link liên hệ (admin)
router.put('/', async (req, res) => {
  try {
    const { qr_code_image, contact_link } = req.body;
    let setting = await AdminSetting.findOne();
    if (!setting) setting = await AdminSetting.create({});
    if (qr_code_image) setting.qr_code_image = qr_code_image;
    if (contact_link) setting.contact_link = contact_link;
    await setting.save();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 