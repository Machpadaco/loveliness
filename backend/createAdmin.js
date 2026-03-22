const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin'); // Adjust path if needed

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to your DB (Uses your .env MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists in the database!");
      process.exit();
    }

    // Hash the password so the login logic can read it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email: email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log(`✅ Admin created successfully: ${email}`);
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();