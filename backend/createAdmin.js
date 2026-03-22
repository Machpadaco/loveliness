const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // ✅ Ensure this path to your Admin model is correct

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

        // We hardcode these for this ONE run to guarantee success
        const email = "admin@test.com";
        const password = "password123";

        // Remove old attempts for this specific email
        await Admin.deleteOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        
        console.log("-----------------------------------------");
        console.log("🚀 ADMIN ACCOUNT CREATED IN ATLAS!");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log("-----------------------------------------");
        
        process.exit();
    } catch (err) {
        console.error("❌ Atlas Connection Error:", err.message);
        process.exit(1);
    }
}

createAtlasAdmin();