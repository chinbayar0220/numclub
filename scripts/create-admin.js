// scripts/create-admin.js
// Create an admin user for testing

import connectDB from '../config/database.js';
import { User } from '../models/index.js';
import 'dotenv/config';

async function createAdmin() {
  try {
    await connectDB();
    
    const adminData = {
      username: 'admin',
      email: 'admin@num.edu.mn',
      password: 'admin123', // Note: In production, use proper password hashing!
      firstName: 'Admin',
      lastName: 'User',
      studentId: 'ADMIN001',
      school: 'its',
      role: 'super_admin',
      interests: ['it'],
      isActive: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('ID:', existingAdmin._id);
      console.log('\nYou can login at: http://localhost:8000/login.html');
      console.log('Email: admin@num.edu.mn');
      console.log('Password: admin123');
      setTimeout(() => process.exit(0), 500);
      return;
    }

    // Create admin user
    const admin = await User.create(adminData);
    
    console.log('✅ Admin user created successfully!');
    console.log('==================================');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('User ID:', admin._id);
    console.log('==================================');
    console.log('\nYou can now login at: http://localhost:8000/login.html');
    
    setTimeout(() => process.exit(0), 500);
  } catch (error) {
    console.error('Error creating admin:', error);
    setTimeout(() => process.exit(1), 500);
  }
}

createAdmin();
