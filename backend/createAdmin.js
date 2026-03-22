const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Import your Admin model - check this path carefully!
const Admin = require('./models/Admin'); 

const mongoUri = "mongodb://localhost:27017/lovelines"; // Update if your DB name is different

async function forceCreateAdmin() {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB...");

        const testEmail = "admin@test.com";
        const testPassword = "password123";

        // Delete any existing admin with this email to start fresh
        await Admin.deleteOne({ email: testEmail });

        const hashedPassword = await bcrypt.hash(testPassword, 10);
        
        const newAdmin = new Admin({
            email: testEmail,
            password: hashedPassword
        });

        await newAdmin.save();
        
        console.log("-----------------------------------------");
        console.log("✅ ADMIN CREATED SUCCESSFULLY!");
        console.log(`Email: ${testEmail}`);
        console.log(`Password: ${testPassword}`);
        console.log("-----------------------------------------");
        
        process.exit();
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

forceCreateAdmin();