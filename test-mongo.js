const mongoose = require('mongoose');
const uri = 'mongodb+srv://Vercel-Admin-pawandb-atlas-demo:jro9vmxvgFyH2oLS@pawandb-atlas-demo.rz0ryil.mongodb.net/pawangroup_portal?retryWrites=true&w=majority';

console.log('Testing MongoDB Atlas connection...');
console.log('URI:', uri.replace(/:[^:@]+@/, ':***@')); // Hide password in logs
console.log('Waiting for connection (timeout: 30s)...');

mongoose.connect(uri, { 
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000
})
.then(() => {
  console.log('SUCCESS: Connected to MongoDB Atlas!');
  process.exit(0);
})
.catch(err => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
