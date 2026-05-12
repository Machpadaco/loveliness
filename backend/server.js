const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// ❌ REMOVED: require('./config/emailConfig'); 
// (We don't need this anymore because we are using Resend via the emailService)

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

// Request Logger (Helps see incoming data in Render Logs)
app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log(`📥 Incoming POST to ${req.path}:`, req.body);
  }
  next();
});

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

// ✅ UPDATED Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ DETAILED SERVER ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error_type: err.name,
  });
});

/* =======================
    SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});