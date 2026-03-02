const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/counselingRoutes'));
app.use('/api', require('./routes/volunteerRoutes'));

// Test route
app.get('/', (req, res) => res.send('Loveliness NGO Backend Running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));