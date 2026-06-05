require('dotenv').config();
const { Worker, QueueScheduler } = require('bullmq');
const { connection } = require('../queue');
const { generatePaper } = require('../ai/adapter');
const Paper = require('../models/Paper');

// Ensure scheduler exists to handle retries/delayed jobs
new QueueScheduler('paper', { connection });

const worker = new Worker('paper', async (job) => {
  const { subject, topic, difficulty, numQuestions, userId } = job.data;
  job.log('Starting generation');
  try {
    const questions = await generatePaper({ subject, topic, difficulty: difficulty || 'Medium', numQuestions: numQuestions || 5 });
    const paperDoc = await Paper.create({ title: `${subject} - ${topic}`, subject, topic, difficulty: difficulty || 'Medium', generatedBy: userId || null, questions });
    await job.updateProgress(100);
    return { success: true, paperId: paperDoc._id.toString() };
  } catch (err) {
    job.log('Error: ' + err.message);
    throw err;
  }
}, { connection });

worker.on('completed', (job, returnvalue) => {
  console.log('Job completed', job.id, returnvalue);
});

worker.on('failed', (job, err) => {
  console.error('Job failed', job.id, err);
});

console.log('Paper worker started');
