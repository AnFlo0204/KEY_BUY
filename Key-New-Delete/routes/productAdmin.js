const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Thêm sản phẩm
router.post('/add', async (req, res) => {
  try {
    const { name, price, type, file_or_link, description } = req.body;
    if (!name || !price || !type) {
      return res.status(400).json({ message: 'Thiếu thông tin sản phẩm.' });
    }
    const product = await Product.create({ name, price, type, file_or_link, description });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa sản phẩm.' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Sửa sản phẩm
router.put('/:id', async (req, res) => {
  try {
    const { name, price, type, file_or_link, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, type, file_or_link, description },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Báo hết hàng
router.put('/out-of-stock/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'out_of_stock' },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Đổi file/link
router.put('/change-file-link/:id', async (req, res) => {
  try {
    const { file_or_link } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { file_or_link },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Đổi giá
router.put('/change-price/:id', async (req, res) => {
  try {
    const { price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Lấy danh sách sản phẩm
router.get('/list', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router; 