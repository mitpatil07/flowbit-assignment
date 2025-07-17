require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./src/models/User'); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // 🧹 Optional: Clear existing users
    await User.deleteMany();

    // 🔐 Hashed passwords
    const users = [
      {
        name: 'Admin User',
        email: 'admin@flowbit.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        tenantId: 'flowbit'
      },
      {
        name: 'Support Agent',
        email: 'agent@flowbit.com',
        password: bcrypt.hashSync('agent123', 10),
        role: 'agent',
        tenantId: 'flowbit'
      }
    ];

    await User.insertMany(users);
    console.log('🚀 Sample users inserted');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

seed();
