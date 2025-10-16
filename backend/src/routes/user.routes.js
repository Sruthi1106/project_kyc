const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const User = require('../models/User');

// Get current user profile
router.get('/user/me', auth(), async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
});

// Get user by id (self or admin only via admin routes)
router.get('/user/:id', auth(), async (req, res) => {
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = await User.findById(req.params.id).select('-passwordHash');
  res.json(user);
});

module.exports = router;


