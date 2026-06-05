const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// CORS for frontend dev server and allow credentials for cookies
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5174', credentials: true }));

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);
const uploads = require('./routes/uploads');
app.use('/api/v1/uploads', uploads);
const uploadsPresign = require('./routes/uploads_presign');
app.use('/api/v1/uploads', uploadsPresign);
const paperRoutes = require('./routes/paper');
app.use('/api/v1/paper', paperRoutes);
const chat = require('./routes/chat');
app.use('/api/v1/chat', chat);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
