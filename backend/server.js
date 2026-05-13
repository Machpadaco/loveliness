const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* =======================
    MIDDLEWARE
======================= */

app.use(cors({
  origin: [
    "https://www.lovelinesnig-africa.org",
    "https://lovelinesnig-africa.org",
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

// Request Logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl}`);

  if (req.method === "POST") {
    console.log("📥 Request Body:", req.body);
  }

  next();
});

/* =======================
    HEALTH CHECK
======================= */

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Loveliness Backend Healthy ✅",
    backend: "https://loveliness-backend.onrender.com"
  });
});

/* =======================
    ROUTES
======================= */

// Public Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/counselling', require('./routes/counsellingRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));

// Admin Routes
app.use('/api/admin', require('./routes/adminAuthRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

/* =======================
    ROOT & TEST ROUTES
======================= */

app.get('/', (req, res) => {
  res.send('Loveliness Backend Running ✅');
});

app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working 🚀',
    status: 'Connected',
    backend: 'https://loveliness-backend.onrender.com'
  });
});

/* =======================
    404 HANDLER
======================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* =======================
    GLOBAL ERROR HANDLER
======================= */

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:");
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error_type: err.name
  });
});

/* =======================
    SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Backend URL: https://loveliness-backend.onrender.com`);
});