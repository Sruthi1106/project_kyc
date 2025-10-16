const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    aadhaar: String,
    pan: String,
    photo: String,
    addressProof: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    aadhaar: { type: String },
    pan: { type: String },
    address: { type: String },
    passwordHash: { type: String, required: true },
    documents: { type: documentSchema, default: {} },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


