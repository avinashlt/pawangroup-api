const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://Vercel-Admin-pawandb-atlas-demo:jro9vmxvgFyH2oLS@pawandb-atlas-demo.rz0ryil.mongodb.net/pawangroup_portal?retryWrites=true&w=majority';

console.log('Testing MongoDB connection...');
console.log('URI:', mongoUri.substring(0, 50) + '...');

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✓ MongoDB connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.log('✗ MongoDB connection failed!');
    console.error('Error:', err.message);
    process.exit(1);
  });

setTimeout(() => {
  console.log('✗ Connection timeout after 10 seconds');
  process.exit(1);
}, 10000);
