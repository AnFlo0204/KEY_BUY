const express = require('express');
const router = express.Router();

// Sinh mã ghi chú 9 số
router.get('/gen-note', (req, res) => {
  const note = Math.floor(100000000 + Math.random() * 900000000).toString();
  res.json({ note });
});

module.exports = router; 