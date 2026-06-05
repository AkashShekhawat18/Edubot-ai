const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');
const Upload = require('../models/Upload');

const router = express.Router();

const bucket = process.env.S3_BUCKET;
const region = process.env.AWS_REGION;

const s3 = new S3Client({ region: region || process.env.AWS_REGION });

// POST /api/v1/uploads/presign
router.post('/presign', async (req, res) => {
  const { filename, contentType } = req.body || {};
  if (!filename || !contentType) return res.status(400).json({ success: false, error: { message: 'filename and contentType required' } });
  if (!bucket) return res.status(500).json({ success: false, error: { message: 'S3 bucket not configured' } });

  const ext = path.extname(filename).toLowerCase();
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2,9)}${ext}`;

  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  try {
    const presigned = await getSignedUrl(s3, cmd, { expiresIn: 900 }); // 15 minutes
    return res.json({ success: true, data: { presignedUrl: presigned, key, url: `https://${bucket}.s3.${region}.amazonaws.com/${key}` } });
  } catch (err) {
    console.error('Presign error', err);
    return res.status(500).json({ success: false, error: { message: 'presign failed' } });
  }
});

// POST /api/v1/uploads/confirm
router.post('/confirm', async (req, res) => {
  const { key, filename, size, mimeType, uploadedBy } = req.body || {};
  if (!key || !filename) return res.status(400).json({ success: false, error: { message: 'key and filename required' } });
  try {
    const doc = await Upload.create({ filename, path: key, url: `https://${bucket}.s3.${region}.amazonaws.com/${key}`, size: size || 0, mimeType: mimeType || '', uploadedBy: uploadedBy || null });
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    console.error('Confirm error', err);
    return res.status(500).json({ success: false, error: { message: 'confirm failed' } });
  }
});

module.exports = router;
