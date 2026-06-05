const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, error: { code: 'VALIDATION', message: 'username and password are required' } });
  }

  const user = await User.findOne({ username }).lean();
  if (!user) return res.status(401).json({ success: false, error: { code: 'AUTH', message: 'Invalid credentials' } });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ success: false, error: { code: 'AUTH', message: 'Invalid credentials' } });

  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1h' });
  // Set HttpOnly cookie for session
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  });

  return res.json({ success: true, data: { user: { id: user._id, username: user.username, role: user.role } } });
});

// GET /api/v1/auth/me - returns current user based on cookie or Authorization header
router.get('/me', async (req, res) => {
  const token = req.cookies?.access_token || (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: { message: 'Not authenticated' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return res.json({ success: true, data: { user: { id: payload.id, username: payload.username, role: payload.role } } });
  } catch (err) {
    return res.status(401).json({ success: false, error: { message: 'Invalid or expired token' } });
  }
});

// POST /api/v1/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  return res.json({ success: true, data: { message: 'Logged out' } });
});

module.exports = router;
