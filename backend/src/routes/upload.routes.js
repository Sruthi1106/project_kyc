const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth.middleware');
const User = require('../models/User');

// Simple disk storage for demo; can be swapped for GridFS or S3
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});

const upload = multer({ storage });

router.post(
  '/upload',
  auth(),
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
  ]),
  async (req, res) => {
    const files = req.files || {};
    const updates = {
      'documents.aadhaar': files.aadhaar?.[0]?.filename,
      'documents.pan': files.pan?.[0]?.filename,
      'documents.photo': files.photo?.[0]?.filename,
      'documents.addressProof': files.addressProof?.[0]?.filename,
    };
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select('-passwordHash');
    res.json(user);
  }
);

module.exports = router;


