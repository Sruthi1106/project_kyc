const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../../', 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'kyc-backend' });
});

// Routes
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/admin.routes'));
app.use('/api', require('./routes/upload.routes'));

// Serve frontend production build if present
const frontDistBase = path.join(__dirname, '../../', 'frontend', 'dist', 'frontend');
let frontDistPath = frontDistBase;
const browserSub = path.join(frontDistBase, 'browser');
if (fs.existsSync(browserSub)) frontDistPath = browserSub;

if (fs.existsSync(frontDistPath)) {
  app.use(express.static(frontDistPath));

  // SPA fallback for Angular
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontDistPath, 'index.html'));
  });
}

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

start();
