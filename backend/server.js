const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize email transporter (verifies connection)
require('./config/emailConfig');

const app = express();

/* =======================
   MIDDLEWARE
======================= */

// ✅ FIXED CORS (VERY IMPORTANT)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

/* =======================
   ROUTES
======================= */

// Public Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/counselling', require('./routes/counsellingRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));

// Admin Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin', require('./routes/adminAuthRoutes'));

/* =======================
   TEST ROUTES
======================= */

app.get('/', (req, res) => {
  res.send('Lovelines Backend Running ✅');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀' });
});

/* =======================
   SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});