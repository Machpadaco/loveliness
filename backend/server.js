const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize email transporter
require('./config/emailConfig');

const app = express();

/* =======================
    MIDDLEWARE
======================= */

app.use(cors({
  origin: [
    "https://loveliness-frontend.onrender.com", 
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
    ROUTES
======================= */

// Public Endpoints
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/counselling', require('./routes/counsellingRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));

// Admin Endpoints
app.use('/api/admin', require('./routes/adminAuthRoutes')); 
app.use('/api/admin', require('./routes/adminRoutes'));

/* =======================
    DIAGNOSTICS & ERRORS
======================= */

app.get('/', (req, res) => {
  res.send('Lovelines Backend Running ✅');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀', status: "Connected" });
});

// Global Error Handler
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
});