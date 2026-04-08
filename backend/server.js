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

// ✅ Updated CORS to include Render frontend
app.use(cors({
  origin: [
    "http://127.0.0.1:5500", 
    "http://localhost:5500",
    "https://loveliness-frontend.onrender.com" // Your live frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
    ROUTES
======================= */

// Public Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/counselling', require('./routes/counsellingRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));

// Admin Routes (Consolidated)
app.use('/api/admin', require('./routes/adminAuthRoutes')); 
app.use('/api/admin', require('./routes/adminRoutes'));

/* =======================
    TEST & ERROR HANDLING
======================= */

app.get('/', (req, res) => {
  res.send('Lovelines Backend Running ✅');
});

// Test route to check if API is reachable from browser
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀', status: "Connected" });
});

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* =======================
    SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Helpful for logs in Render dashboard
  if (process.env.NODE_ENV === 'production') {
    console.log(`🔗 Production URL: https://loveliness-backend.onrender.com`);
  } else {
    console.log(`🔗 Local Link: http://localhost:${PORT}`);
  }
});