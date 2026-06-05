const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.cookies?.access_token || (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: { message: 'Not authenticated' } });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, error: { message: 'Invalid or expired token' } });
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ success: false, error: { message: 'Not authenticated' } });
    if (req.user.role !== role) return res.status(403).json({ success: false, error: { message: 'Forbidden' } });
    return next();
  };
}

module.exports = { authenticate, requireRole };
