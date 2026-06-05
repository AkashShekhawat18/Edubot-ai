const express = require('express');
const Paper = require('../models/Paper');
const { paperQueue } = require('../queue');

const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();

// POST /api/v1/paper/generate (teacher only)
router.post('/generate', authenticate, requireRole('teacher'), async (req, res) => {
  const { subject, topic, difficulty, numQuestions } = req.body || {};
  if (!subject || !topic) return res.status(400).json({ success: false, error: { message: 'subject and topic required' } });

  try {
    const job = await paperQueue.add('paper-generate', { subject, topic, difficulty, numQuestions, userId: req.user?.id || null });
    return res.json({ success: true, data: { jobId: job.id } });
  } catch (err) {
    console.error('Paper enqueue error', err);
    return res.status(500).json({ success: false, error: { message: 'enqueue failed' } });
  }
});

// GET job status and result
router.get('/status/:jobId', authenticate, requireRole('teacher'), async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await paperQueue.getJob(jobId);
    if (!job) return res.status(404).json({ success: false, error: { message: 'job not found' } });
    const state = await job.getState();
    const progress = job._progress || 0;
    const returnValue = job.returnvalue || null;
    return res.json({ success: true, data: { state, progress, result: returnValue } });
  } catch (err) {
    console.error('Status fetch error', err);
    return res.status(500).json({ success: false, error: { message: 'status fetch failed' } });
  }
});

module.exports = router;
