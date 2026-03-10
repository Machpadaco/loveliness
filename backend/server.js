const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize email transporter (this triggers verification)
require('./config/emailConfig');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/counselling', require('./routes/counsellingRoutes')); // Counselling route added
app.use('/api/volunteer', require('./routes/volunteerRoutes'));

// Test Route
app.get('/', (req, res) => {
  res.send('Loveliness Backend Running ✅');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working 🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});