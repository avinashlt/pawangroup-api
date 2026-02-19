import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawangroup_portal';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      retryWrites: true,
    } as any);
    
    console.log('✓ Connected to MongoDB');
  } catch (error: any) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Define Collections
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ['supervisor', 'admin'], required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date,
});

const siteSchema = new mongoose.Schema({
  name: String,
  address: String,
  clientName: String,
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  isActive: { type: Boolean, default: true },
  location: { latitude: Number, longitude: Number },
  requiredGuards: Number,
  operatingHours: String,
  createdAt: Date,
  updatedAt: Date,
});

const guardSchema = new mongoose.Schema({
  name: String,
  employeeId: { type: String, unique: true },
  phone: String,
  photo: String,
  assignedSite: String,
  shift: { type: String, enum: ['morning', 'evening', 'night'] },
  status: { type: String, enum: ['active', 'inactive', 'on-leave'], default: 'active' },
  email: String,
  dateOfJoining: Date,
  emergencyContact: String,
  address: String,
  createdAt: Date,
  updatedAt: Date,
});

const shiftTemplateSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  endTime: String,
  breakDuration: Number,
  daysOfWeek: [Number],
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  requiredGuards: Number,
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date,
});

const scheduledShiftSchema = new mongoose.Schema({
  templateId: mongoose.Schema.Types.ObjectId,
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  date: String,
  startTime: String,
  endTime: String,
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no-show'] },
  createdAt: Date,
  updatedAt: Date,
});

const attendanceSchema = new mongoose.Schema({
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  date: String,
  checkIn: String,
  checkOut: String,
  status: { type: String, enum: ['present', 'absent', 'late', 'on-leave'] },
  site: String,
  shift: String,
  workHours: Number,
  notes: String,
  checkInLocation: { latitude: Number, longitude: Number },
  checkOutLocation: { latitude: Number, longitude: Number },
  createdAt: Date,
  updatedAt: Date,
});

const checkpointSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['nfc', 'qr', 'beacon'] },
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  location: { latitude: Number, longitude: Number, address: String },
  isActive: { type: Boolean, default: true },
  requiredScanFrequency: Number,
  createdAt: Date,
  updatedAt: Date,
});

const checkpointScanSchema = new mongoose.Schema({
  checkpointId: mongoose.Schema.Types.ObjectId,
  checkpointName: String,
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  timestamp: Date,
  status: { type: String, enum: ['success', 'missed', 'late'] },
  createdAt: Date,
  updatedAt: Date,
});

const geofenceSchema = new mongoose.Schema({
  name: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  type: { type: String, enum: ['circle', 'polygon'] },
  center: { latitude: Number, longitude: Number },
  radius: Number,
  polygon: [{ latitude: Number, longitude: Number }],
  isActive: { type: Boolean, default: true },
  alertOnExit: { type: Boolean, default: true },
  alertOnEntry: { type: Boolean, default: false },
  assignedGuards: [mongoose.Schema.Types.ObjectId],
  createdAt: Date,
  updatedAt: Date,
});

const cameraSchema = new mongoose.Schema({
  name: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  location: String,
  type: { type: String, enum: ['indoor', 'outdoor', 'ptz'] },
  isOnline: { type: Boolean, default: true },
  status: { type: String, enum: ['online', 'offline', 'maintenance', 'error'], default: 'online' },
  isRecording: { type: Boolean, default: false },
  aiEnabled: { type: Boolean, default: false },
  lastSeen: Date,
  streamUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

const incidentSchema = new mongoose.Schema({
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  title: String,
  description: String,
  type: { type: String, enum: ['security-breach', 'injury', 'equipment-damage', 'unauthorized-access', 'other'] },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
  status: { type: String, enum: ['open', 'investigating', 'resolved', 'closed'] },
  location: { latitude: Number, longitude: Number, address: String },
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  media: [mongoose.Schema.Types.Mixed],
  witnesses: [String],
  notes: String,
  createdAt: Date,
  updatedAt: Date,
});

const sosAlertSchema = new mongoose.Schema({
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  guardPhone: String,
  type: { type: String, enum: ['emergency', 'medical', 'security', 'other'] },
  status: { type: String, enum: ['active', 'responded', 'resolved', 'cancelled'] },
  location: { latitude: Number, longitude: Number, address: String },
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  description: String,
  respondedBy: String,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date,
});

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'] },
  title: String,
  message: String,
  timestamp: Date,
  isRead: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'low' },
  relatedId: String,
  relatedType: String,
  userId: mongoose.Schema.Types.ObjectId,
  targetRole: String,
  createdAt: Date,
  updatedAt: Date,
});

const reportSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['incident', 'attendance', 'compliance', 'performance', 'shift', 'custom'] },
  startDate: Date,
  endDate: Date,
  generatedBy: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  guardIds: [mongoose.Schema.Types.ObjectId],
  data: mongoose.Schema.Types.Mixed,
  fileUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

const monitoringSchema = new mongoose.Schema({
  guardId: mongoose.Schema.Types.ObjectId,
  guardName: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  timestamp: Date,
  status: { type: String, enum: ['online', 'offline', 'idle', 'active'] },
  lastLocation: { latitude: Number, longitude: Number },
  speed: Number,
  batteryLevel: Number,
  signalStrength: Number,
  createdAt: Date,
  updatedAt: Date,
});

const trainingSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['onboarding', 'safety', 'skill-development', 'compliance', 'other'] },
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  guardIds: [mongoose.Schema.Types.ObjectId],
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['scheduled', 'in-progress', 'completed', 'cancelled'] },
  instructor: String,
  certificateUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

const complianceSchema = new mongoose.Schema({
  type: { type: String, enum: ['policy', 'regulation', 'audit', 'certification'] },
  title: String,
  description: String,
  siteId: mongoose.Schema.Types.ObjectId,
  siteName: String,
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'failed'] },
  dueDate: Date,
  completedDate: Date,
  assignedTo: String,
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
  documentUrl: String,
  createdAt: Date,
  updatedAt: Date,
});

// Get models
const User = mongoose.model('User', userSchema);
const Site = mongoose.model('Site', siteSchema);
const Guard = mongoose.model('Guard', guardSchema);
const ShiftTemplate = mongoose.model('ShiftTemplate', shiftTemplateSchema);
const ScheduledShift = mongoose.model('ScheduledShift', scheduledShiftSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);
const CheckpointScan = mongoose.model('CheckpointScan', checkpointScanSchema);
const Geofence = mongoose.model('Geofence', geofenceSchema);
const Camera = mongoose.model('Camera', cameraSchema);
const Incident = mongoose.model('Incident', incidentSchema);
const SosAlert = mongoose.model('SosAlert', sosAlertSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Report = mongoose.model('Report', reportSchema);
const Monitoring = mongoose.model('Monitoring', monitoringSchema);
const Training = mongoose.model('Training', trainingSchema);
const Compliance = mongoose.model('Compliance', complianceSchema);

// Seed Data
const runSeed = async () => {
  try {
    // Clear existing data
    console.log('\nClearing existing data...');
    await User.deleteMany({});
    await Site.deleteMany({});
    await Guard.deleteMany({});
    await ShiftTemplate.deleteMany({});
    await ScheduledShift.deleteMany({});
    await Attendance.deleteMany({});
    await Checkpoint.deleteMany({});
    await CheckpointScan.deleteMany({});
    await Geofence.deleteMany({});
    await Camera.deleteMany({});
    await Incident.deleteMany({});
    await SosAlert.deleteMany({});
    await Notification.deleteMany({});
    await Report.deleteMany({});
    await Monitoring.deleteMany({});
    await Training.deleteMany({});
    await Compliance.deleteMany({});
    console.log('✓ Collections cleared');

    // Seed Users
    console.log('\nSeeding Users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        username: 'admin1',
        name: 'Admin User',
        role: 'admin',
        email: 'admin@pawangroup.com',
        password: hashedPassword,
        phone: '+91-9876543210',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'supervisor1',
        name: 'John Supervisor',
        role: 'supervisor',
        email: 'supervisor@pawangroup.com',
        password: hashedPassword,
        phone: '+91-9876543211',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'supervisor2',
        name: 'Jane Supervisor',
        role: 'supervisor',
        email: 'jane.supervisor@pawangroup.com',
        password: hashedPassword,
        phone: '+91-9876543212',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${users.length} users created`);

    // Seed Sites
    console.log('\nSeeding Sites...');
    const sites = await Site.insertMany([
      {
        name: 'Mumbai Central Office',
        address: '123 Business Park, Mumbai, Maharashtra',
        clientName: 'Tech Corp India',
        contactPerson: 'Rajesh Kumar',
        contactPhone: '+91-9876543220',
        contactEmail: 'rajesh@techcorp.com',
        isActive: true,
        location: { latitude: 19.0760, longitude: 72.8777 },
        requiredGuards: 4,
        operatingHours: '24/7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delhi Manufacturing Plant',
        address: '456 Industrial Zone, Delhi',
        clientName: 'Manufacturing Solutions Ltd',
        contactPerson: 'Priya Singh',
        contactPhone: '+91-9876543221',
        contactEmail: 'priya@manufacturing.com',
        isActive: true,
        location: { latitude: 28.7041, longitude: 77.1025 },
        requiredGuards: 6,
        operatingHours: '6:00 AM - 10:00 PM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bangalore Tech Campus',
        address: '789 IT Park, Bangalore, Karnataka',
        clientName: 'Digital Solutions Inc',
        contactPerson: 'Amit Patel',
        contactPhone: '+91-9876543222',
        contactEmail: 'amit@digitalsolutions.com',
        isActive: true,
        location: { latitude: 12.9716, longitude: 77.5946 },
        requiredGuards: 5,
        operatingHours: '24/7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${sites.length} sites created`);

    // Seed Guards
    console.log('\nSeeding Guards...');
    const guards = await Guard.insertMany([
      {
        name: 'Rajesh Verma',
        employeeId: 'EMP001',
        phone: '+91-9876543230',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Mumbai Central Office',
        shift: 'morning',
        status: 'active',
        email: 'rajesh.verma@pawangroup.com',
        dateOfJoining: new Date('2023-01-15'),
        emergencyContact: '+91-9876543231',
        address: '101 Guard Colony, Mumbai',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Arjun Kumar',
        employeeId: 'EMP002',
        phone: '+91-9876543232',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Mumbai Central Office',
        shift: 'evening',
        status: 'active',
        email: 'arjun.kumar@pawangroup.com',
        dateOfJoining: new Date('2023-02-20'),
        emergencyContact: '+91-9876543233',
        address: '102 Guard Colony, Mumbai',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vikram Singh',
        employeeId: 'EMP003',
        phone: '+91-9876543234',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Mumbai Central Office',
        shift: 'night',
        status: 'active',
        email: 'vikram.singh@pawangroup.com',
        dateOfJoining: new Date('2023-03-10'),
        emergencyContact: '+91-9876543235',
        address: '103 Guard Colony, Mumbai',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mohammed Hassan',
        employeeId: 'EMP004',
        phone: '+91-9876543236',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Delhi Manufacturing Plant',
        shift: 'morning',
        status: 'active',
        email: 'hassan.m@pawangroup.com',
        dateOfJoining: new Date('2023-04-05'),
        emergencyContact: '+91-9876543237',
        address: '201 Industrial Quarters, Delhi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ravi Patel',
        employeeId: 'EMP005',
        phone: '+91-9876543238',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Bangalore Tech Campus',
        shift: 'evening',
        status: 'active',
        email: 'ravi.patel@pawangroup.com',
        dateOfJoining: new Date('2023-05-15'),
        emergencyContact: '+91-9876543239',
        address: '301 Tech Quarters, Bangalore',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deepak Singh',
        employeeId: 'EMP006',
        phone: '+91-9876543240',
        photo: 'https://via.placeholder.com/150',
        assignedSite: 'Bangalore Tech Campus',
        shift: 'night',
        status: 'on-leave',
        email: 'deepak.singh@pawangroup.com',
        dateOfJoining: new Date('2023-06-20'),
        emergencyContact: '+91-9876543241',
        address: '302 Tech Quarters, Bangalore',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${guards.length} guards created`);

    // Seed Shift Templates
    console.log('\nSeeding Shift Templates...');
    const shiftTemplates = await ShiftTemplate.insertMany([
      {
        name: 'Morning Shift',
        startTime: '06:00',
        endTime: '14:00',
        breakDuration: 30,
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        siteId: sites[0]._id,
        siteName: sites[0].name,
        requiredGuards: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Evening Shift',
        startTime: '14:00',
        endTime: '22:00',
        breakDuration: 30,
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        siteId: sites[0]._id,
        siteName: sites[0].name,
        requiredGuards: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Night Shift',
        startTime: '22:00',
        endTime: '06:00',
        breakDuration: 45,
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        siteId: sites[0]._id,
        siteName: sites[0].name,
        requiredGuards: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${shiftTemplates.length} shift templates created`);

    // Seed Scheduled Shifts
    console.log('\nSeeding Scheduled Shifts...');
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const dateFormat = (d: Date) => d.toISOString().split('T')[0];

    const scheduledShifts = await ScheduledShift.insertMany([
      {
        templateId: shiftTemplates[0]._id,
        guardId: guards[0]._id,
        guardName: guards[0].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        date: dateFormat(yesterday),
        startTime: '06:00',
        endTime: '14:00',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        templateId: shiftTemplates[0]._id,
        guardId: guards[1]._id,
        guardName: guards[1].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        date: dateFormat(today),
        startTime: '14:00',
        endTime: '22:00',
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        templateId: shiftTemplates[2]._id,
        guardId: guards[2]._id,
        guardName: guards[2].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        date: dateFormat(tomorrow),
        startTime: '22:00',
        endTime: '06:00',
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${scheduledShifts.length} scheduled shifts created`);

    // Seed Attendance
    console.log('\nSeeding Attendance...');
    const attendances = await Attendance.insertMany([
      {
        guardId: guards[0]._id,
        guardName: guards[0].name,
        date: dateFormat(yesterday),
        checkIn: '05:58',
        checkOut: '14:05',
        status: 'present',
        site: 'Mumbai Central Office',
        shift: 'morning',
        workHours: 8.1,
        notes: 'Normal day',
        checkInLocation: { latitude: 19.0760, longitude: 72.8777 },
        checkOutLocation: { latitude: 19.0760, longitude: 72.8777 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guardId: guards[2]._id,
        guardName: guards[2].name,
        date: dateFormat(new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)),
        checkIn: '09:15',
        checkOut: null,
        status: 'late',
        site: 'Mumbai Central Office',
        shift: 'night',
        workHours: 0,
        notes: 'Late arrival - traffic',
        checkInLocation: { latitude: 19.0760, longitude: 72.8777 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guardId: guards[4]._id,
        guardName: guards[4].name,
        date: dateFormat(yesterday),
        checkIn: null,
        checkOut: null,
        status: 'absent',
        site: 'Bangalore Tech Campus',
        shift: 'evening',
        workHours: 0,
        notes: 'No reason provided',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${attendances.length} attendance records created`);

    // Seed Checkpoints
    console.log('\nSeeding Checkpoints...');
    const checkpoints = await Checkpoint.insertMany([
      {
        name: 'Main Gate Checkpoint',
        type: 'nfc',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        location: { latitude: 19.0760, longitude: 72.8777, address: 'Main Gate' },
        isActive: true,
        requiredScanFrequency: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Server Room Checkpoint',
        type: 'qr',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        location: { latitude: 19.0765, longitude: 72.8782, address: '3rd Floor, Server Room' },
        isActive: true,
        requiredScanFrequency: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Warehouse Checkpoint',
        type: 'beacon',
        siteId: sites[1]._id,
        siteName: sites[1].name,
        location: { latitude: 28.7045, longitude: 77.1030, address: 'Warehouse A' },
        isActive: true,
        requiredScanFrequency: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${checkpoints.length} checkpoints created`);

    // Seed Checkpoint Scans
    console.log('\nSeeding Checkpoint Scans...');
    const checkpointScans = await CheckpointScan.insertMany([
      {
        checkpointId: checkpoints[0]._id,
        checkpointName: checkpoints[0].name,
        guardId: guards[0]._id,
        guardName: guards[0].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        timestamp: new Date(yesterday.getTime() + 6 * 60 * 60 * 1000),
        status: 'success',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        checkpointId: checkpoints[0]._id,
        checkpointName: checkpoints[0].name,
        guardId: guards[0]._id,
        guardName: guards[0].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        timestamp: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000),
        status: 'success',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        checkpointId: checkpoints[1]._id,
        checkpointName: checkpoints[1].name,
        guardId: guards[1]._id,
        guardName: guards[1].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        timestamp: new Date(today.getTime() + 4 * 60 * 60 * 1000),
        status: 'missed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${checkpointScans.length} checkpoint scans created`);

    // Seed Geofences
    console.log('\nSeeding Geofences...');
    const geofences = await Geofence.insertMany([
      {
        name: 'Mumbai Office Boundary',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        type: 'circle',
        center: { latitude: 19.0760, longitude: 72.8777 },
        radius: 500,
        isActive: true,
        alertOnExit: true,
        alertOnEntry: false,
        assignedGuards: [guards[0]._id, guards[1]._id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delhi Plant Perimeter',
        siteId: sites[1]._id,
        siteName: sites[1].name,
        type: 'polygon',
        polygon: [
          { latitude: 28.7040, longitude: 77.1020 },
          { latitude: 28.7050, longitude: 77.1030 },
          { latitude: 28.7045, longitude: 77.1040 },
          { latitude: 28.7035, longitude: 77.1035 },
        ],
        isActive: true,
        alertOnExit: true,
        alertOnEntry: true,
        assignedGuards: [guards[3]._id],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${geofences.length} geofences created`);

    // Seed Cameras
    console.log('\nSeeding Cameras...');
    const cameras = await Camera.insertMany([
      {
        name: 'Entrance Camera 1',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        location: 'Main Entrance',
        type: 'outdoor',
        isOnline: true,
        status: 'online',
        isRecording: true,
        aiEnabled: true,
        lastSeen: new Date(),
        streamUrl: 'rtsp://camera1.local:554/stream',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Server Room Camera',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        location: '3rd Floor Server Room',
        type: 'indoor',
        isOnline: true,
        status: 'online',
        isRecording: true,
        aiEnabled: false,
        lastSeen: new Date(),
        streamUrl: 'rtsp://camera2.local:554/stream',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PTZ Dome Camera',
        siteId: sites[1]._id,
        siteName: sites[1].name,
        location: 'Warehouse Central',
        type: 'ptz',
        isOnline: false,
        status: 'offline',
        isRecording: false,
        aiEnabled: false,
        lastSeen: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        streamUrl: 'rtsp://camera3.local:554/stream',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${cameras.length} cameras created`);

    // Seed Incidents
    console.log('\nSeeding Incidents...');
    const incidents = await Incident.insertMany([
      {
        guardId: guards[0]._id,
        guardName: guards[0].name,
        title: 'Unauthorized Access Attempt',
        description: 'Someone tried to access the server room without authorization',
        type: 'unauthorized-access',
        severity: 'high',
        status: 'investigating',
        location: { latitude: 19.0765, longitude: 72.8782, address: 'Server Room' },
        siteId: sites[0]._id,
        siteName: sites[0].name,
        media: [
          { type: 'image', url: 'https://via.placeholder.com/640x480', uploadedAt: yesterday },
        ],
        witnesses: ['Rajesh Verma', 'Arjun Kumar'],
        notes: 'CCTV footage recorded',
        createdAt: yesterday,
        updatedAt: new Date(),
      },
      {
        guardId: guards[3]._id,
        guardName: guards[3].name,
        title: 'Minor Equipment Damage',
        description: 'Fire extinguisher bracket was damaged',
        type: 'equipment-damage',
        severity: 'low',
        status: 'resolved',
        location: { latitude: 28.7045, longitude: 77.1030, address: 'Warehouse' },
        siteId: sites[1]._id,
        siteName: sites[1].name,
        media: [],
        witnesses: [],
        notes: 'Repair initiated',
        createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(today.getTime() - 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ ${incidents.length} incidents created`);

    // Seed SOS Alerts
    console.log('\nSeeding SOS Alerts...');
    const sosAlerts = await SosAlert.insertMany([
      {
        guardId: guards[2]._id,
        guardName: guards[2].name,
        guardPhone: guards[2].phone,
        type: 'medical',
        status: 'resolved',
        location: { latitude: 19.0760, longitude: 72.8777, address: 'Guard Post' },
        siteId: sites[0]._id,
        siteName: sites[0].name,
        description: 'Guard felt dizzy',
        respondedBy: 'Supervisor 1',
        resolvedAt: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        createdAt: new Date(today.getTime() - 3 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
      {
        guardId: guards[0]._id,
        guardName: guards[0].name,
        guardPhone: guards[0].phone,
        type: 'emergency',
        status: 'active',
        location: { latitude: 19.0765, longitude: 72.8780, address: 'Server Room Area' },
        siteId: sites[0]._id,
        siteName: sites[0].name,
        description: 'Security breach detected',
        respondedBy: null,
        createdAt: new Date(today.getTime() - 30 * 60 * 1000),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${sosAlerts.length} SOS alerts created`);

    // Seed Notifications
    console.log('\nSeeding Notifications...');
    const notifications = await Notification.insertMany([
      {
        type: 'shift-confirmation',
        title: 'Shift Confirmation',
        message: 'Your shift for tomorrow has been confirmed',
        timestamp: new Date(),
        isRead: false,
        priority: 'medium',
        relatedId: scheduledShifts[1]._id.toString(),
        relatedType: 'ScheduledShift',
        userId: users[0]._id,
        targetRole: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'incident',
        title: 'New Incident Reported',
        message: 'Unauthorized access attempt at Server Room',
        timestamp: new Date(yesterday),
        isRead: true,
        priority: 'high',
        relatedId: incidents[0]._id.toString(),
        relatedType: 'Incident',
        userId: null,
        targetRole: 'supervisor',
        createdAt: yesterday,
        updatedAt: new Date(),
      },
      {
        type: 'sos',
        title: 'SOS Alert',
        message: 'Emergency alert from guards at Mumbai office',
        timestamp: new Date(today.getTime() - 30 * 60 * 1000),
        isRead: false,
        priority: 'critical',
        relatedId: sosAlerts[1]._id.toString(),
        relatedType: 'SosAlert',
        userId: null,
        targetRole: 'admin',
        createdAt: new Date(today.getTime() - 30 * 60 * 1000),
        updatedAt: new Date(),
      },
      {
        type: 'system',
        title: 'Database Backup Complete',
        message: 'Daily backup completed successfully',
        timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        isRead: true,
        priority: 'low',
        targetRole: 'admin',
        createdAt: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${notifications.length} notifications created`);

    // Seed Reports
    console.log('\nSeeding Reports...');
    const reports = await Report.insertMany([
      {
        title: 'Monthly Attendance Report - January 2026',
        type: 'attendance',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
        generatedBy: users[0].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        guardIds: [guards[0]._id, guards[1]._id, guards[2]._id],
        data: { totalDays: 31, presentDays: 28, absentDays: 2, lateDays: 1 },
        fileUrl: 'https://via.placeholder.com/download/report1.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Incident Report - Q1 2026',
        type: 'incident',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-03-31'),
        generatedBy: users[1].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        guardIds: [],
        data: { totalIncidents: 5, critical: 1, high: 2, medium: 2, low: 0 },
        fileUrl: 'https://via.placeholder.com/download/report2.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Site Compliance Audit',
        type: 'compliance',
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-02-28'),
        generatedBy: users[0].name,
        siteId: sites[1]._id,
        siteName: sites[1].name,
        guardIds: [],
        data: { auditScore: 92, passed: true, findings: 2 },
        fileUrl: 'https://via.placeholder.com/download/report3.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${reports.length} reports created`);

    // Seed Monitoring
    console.log('\nSeeding Monitoring...');
    const monitoringData = await Monitoring.insertMany([
      {
        guardId: guards[0]._id,
        guardName: guards[0].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        timestamp: new Date(),
        status: 'active',
        lastLocation: { latitude: 19.0760, longitude: 72.8777 },
        speed: 0,
        batteryLevel: 85,
        signalStrength: -45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guardId: guards[1]._id,
        guardName: guards[1].name,
        siteId: sites[0]._id,
        siteName: sites[0].name,
        timestamp: new Date(),
        status: 'idle',
        lastLocation: { latitude: 19.0765, longitude: 72.8780 },
        speed: 0,
        batteryLevel: 45,
        signalStrength: -55,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guardId: guards[4]._id,
        guardName: guards[4].name,
        siteId: sites[2]._id,
        siteName: sites[2].name,
        timestamp: new Date(today.getTime() - 30 * 60 * 1000),
        status: 'offline',
        lastLocation: { latitude: 12.9716, longitude: 77.5946 },
        speed: 0,
        batteryLevel: 5,
        signalStrength: -75,
        createdAt: new Date(today.getTime() - 30 * 60 * 1000),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${monitoringData.length} monitoring records created`);

    // Seed Training
    console.log('\nSeeding Training...');
    const trainings = await Training.insertMany([
      {
        title: 'Advanced Security Protocol Training',
        description: 'Training on latest security protocols and procedures',
        type: 'safety',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        guardIds: [guards[0]._id, guards[1]._id, guards[2]._id],
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-02-05'),
        status: 'in-progress',
        instructor: 'John Trainer',
        certificateUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Onboarding - New Guards',
        description: 'Basic onboarding for newly joined guards',
        type: 'onboarding',
        siteId: sites[1]._id,
        siteName: sites[1].name,
        guardIds: [guards[3]._id],
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-01-20'),
        status: 'completed',
        instructor: 'Jane Trainer',
        certificateUrl: 'https://via.placeholder.com/certificates/cert1.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Emergency Response Drill',
        description: 'Quarterly emergency response training',
        type: 'skill-development',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        guardIds: [guards[0]._id, guards[1]._id],
        startDate: new Date(tomorrow),
        endDate: new Date(new Date(tomorrow).getTime() + 2 * 24 * 60 * 60 * 1000),
        status: 'scheduled',
        instructor: 'Emergency Team',
        certificateUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${trainings.length} training records created`);

    // Seed Compliance
    console.log('\nSeeding Compliance...');
    const compliances = await Compliance.insertMany([
      {
        type: 'policy',
        title: 'Annual Compliance Review',
        description: 'Annual review of security policies and procedures',
        siteId: sites[0]._id,
        siteName: sites[0].name,
        status: 'in-progress',
        dueDate: new Date('2026-03-31'),
        priority: 'high',
        assignedTo: users[1].name,
        documentUrl: 'https://via.placeholder.com/documents/policy1.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'audit',
        title: 'Quarterly Security Audit',
        description: 'Q1 2026 Security Audit',
        siteId: sites[1]._id,
        siteName: sites[1].name,
        status: 'completed',
        dueDate: new Date('2026-03-31'),
        completedDate: new Date('2026-02-14'),
        priority: 'critical',
        assignedTo: users[0].name,
        documentUrl: 'https://via.placeholder.com/documents/audit1.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'certification',
        title: 'ISO Security Certification',
        description: 'Maintain ISO 27001 certification',
        siteId: sites[2]._id,
        siteName: sites[2].name,
        status: 'pending',
        dueDate: new Date('2026-06-30'),
        priority: 'high',
        assignedTo: users[0].name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log(`✓ ${compliances.length} compliance records created`);

    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Sites: ${sites.length}`);
    console.log(`  - Guards: ${guards.length}`);
    console.log(`  - Shift Templates: ${shiftTemplates.length}`);
    console.log(`  - Scheduled Shifts: ${scheduledShifts.length}`);
    console.log(`  - Attendance: ${attendances.length}`);
    console.log(`  - Checkpoints: ${checkpoints.length}`);
    console.log(`  - Checkpoint Scans: ${checkpointScans.length}`);
    console.log(`  - Geofences: ${geofences.length}`);
    console.log(`  - Cameras: ${cameras.length}`);
    console.log(`  - Incidents: ${incidents.length}`);
    console.log(`  - SOS Alerts: ${sosAlerts.length}`);
    console.log(`  - Notifications: ${notifications.length}`);
    console.log(`  - Reports: ${reports.length}`);
    console.log(`  - Monitoring: ${monitoringData.length}`);
    console.log(`  - Training: ${trainings.length}`);
    console.log(`  - Compliance: ${compliances.length}\n`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error: any) {
    console.error('\n✗ Error during seeding:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  runSeed();
});
