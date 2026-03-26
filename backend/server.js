const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ✅ ADDED
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

// ✅ CORS MUST come before routes
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FRONTEND FILES ✅ ADDED
======================= */

app.use(express.static(path.join(__dirname, 'frontend')));

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
    TEST & ERROR HANDLING
======================= */

app.get('/', (req, res) => {
  res.send('Lovelines Backend Running ✅');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀', status: "Connected" });
});

// Error handler
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
  console.log(`🔗 Local Link: http://127.0.0.1:${PORT}`);
});