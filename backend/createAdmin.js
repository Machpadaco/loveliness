const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); 

dotenv.config();

const createAdmin = async () => {
  try {
    // 1. Ensure your MONGO_URI is present
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/lovelines"; 
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    // 2. HARDCODE these for this one run to guarantee success
    // After you log in once, you can delete this file.
    const email = "admin@lovelines.com"; 
    const password = "admin12345"; 

    console.log(`Attempting to create admin: ${email}`);

    // 3. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists in the database!");
      process.exit();
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email: email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log("------------------------------------------");
    console.log(`✅ SUCCESS! Admin created.`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("------------------------------------------");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();