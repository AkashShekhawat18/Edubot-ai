const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// POST /api/v1/chat
router.post('/', async (req, res) => {
  const { question } = req.body || {};
  if (!question) return res.status(400).json({ success: false, error: { message: 'question required' } });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.json({ success: true, data: { response: `Echo: ${question}` } });
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: question }],
      }),
    });
    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);
    res.json({ success: true, data: { response: text } });
  } catch (err) {
    res.status(502).json({ success: false, error: { message: 'AI service error' } });
  }
});

module.exports = router;
