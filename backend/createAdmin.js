// backend/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // ✅ Path must be correct

// Load environment variables
dotenv.config();

async function createAtlasAdmin() {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("❌ Error: MONGO_URI not found in your .env file!");
            process.exit(1);
        }

        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(mongoUri);
        console.log("✅ Connected successfully to Atlas.");

        // ✅ Securely load from environment variables
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        // Verify the variables are set
        if (!email || !password) {
            console.error("❌ Error: ADMIN_EMAIL or ADMIN_PASSWORD missing in .env!");
            process.exit(1);
        }

        // Optional: Remove old attempts for this specific email (comment this out for reuse)
        await Admin.deleteOne({ email });

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the admin model instance
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        // Save to the database
        await newAdmin.save();
        
        console.log("-----------------------------------------");
        console.log("🚀 ADMIN ACCOUNT CREATED IN ATLAS!");
        // We log the variables loaded, so we know what was used
        console.log(`Email: ${email}`);
        // Be cautious logging passwords, but it's loaded securely from .env
        console.log(`Password: ${password}`); 
        console.log("-----------------------------------------");
        
        process.exit();
    } catch (err) {
        console.error("❌ Atlas Connection Error:", err.message);
        process.exit(1);
    }
}

createAtlasAdmin();