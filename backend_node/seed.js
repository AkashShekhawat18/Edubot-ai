const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');

async function seed() {
  await connectDB();
  const count = await User.countDocuments();
  if (count === 0) {
    const users = [
      { username: 'teacher1', password: 'password123', role: 'teacher' },
      { username: 'student1', password: 'password123', role: 'student' },
    ];

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 10);
      await User.create({ username: u.username, passwordHash: hash, role: u.role });
    }
    console.log('Seeded default users');
  } else {
    console.log('Users already exist, skipping seed');
  }
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
