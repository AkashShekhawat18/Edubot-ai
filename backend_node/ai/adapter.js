const fetch = require('node-fetch');

async function generatePaperWithOpenAI({ subject, topic, difficulty, numQuestions = 5 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const prompt = `Generate ${numQuestions} exam questions for subject: ${subject}, topic: ${topic}, difficulty: ${difficulty}. Return as a JSON array of {text, marks, difficulty}.`;

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], temperature: 0.2 }),
  });
  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || '';
  // Try to parse JSON inside response, else fallback to simple parsing
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    // Simple split fallback
    const lines = text.split('\n').filter(Boolean).slice(0, numQuestions);
    return lines.map((l, i) => ({ text: l.trim(), marks: 2, difficulty }));
  }
}

// Dummy generator when no API key
function dummyGenerate({ subject, topic, difficulty, numQuestions = 5 }) {
  const qs = [];
  for (let i = 1; i <= numQuestions; i++) {
    qs.push({ text: `${i}. (${difficulty}) ${topic} question ${i} for ${subject}.`, marks: 2, difficulty });
  }
  return qs;
}

async function generatePaper(opts) {
  if (process.env.OPENAI_API_KEY) {
    try {
      return await generatePaperWithOpenAI(opts);
    } catch (err) {
      console.error('OpenAI generation failed, falling back to dummy', err);
      return dummyGenerate(opts);
    }
  }
  return dummyGenerate(opts);
}

module.exports = { generatePaper };
