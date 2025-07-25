const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const keyRoutes = require('./routes/key');
app.use('/api/key', keyRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const purchaseRoutes = require('./routes/purchase');
app.use('/api/purchase', purchaseRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const productAdminRoutes = require('./routes/productAdmin');
app.use('/api/admin/product', productAdminRoutes);

const settingRoutes = require('./routes/setting');
app.use('/api/setting', settingRoutes);

const qrRoutes = require('./routes/qr');
app.use('/api/qr', qrRoutes);

app.get('/', (req, res) => {
  res.send('Key-New-Delete API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 