const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const User = require('../models/User');

// List all users
router.get('/users', auth('admin'), async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
});

// Update KYC status
router.put('/user/:id/status', auth('admin'), async (req, res) => {
  const { status, reason } = req.body; // reason can be stored later if needed
  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).select('-passwordHash');
  res.json(user);
});

module.exports = router;


