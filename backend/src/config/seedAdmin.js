const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

dotenv.config();

async function seed() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kyc_portal';
  await mongoose.connect(MONGO_URI);
  const email = process.env.ADMIN_EMAIL || 'admin@kycportal.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash });
    console.log('Seeded admin:', email);
  } else {
    console.log('Admin already exists');
  }
  await mongoose.disconnect();
}

if (require.main === module) {
  seed().then(() => process.exit(0));
}

module.exports = { seed };


