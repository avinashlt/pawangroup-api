# Database Setup Guide

## Pawan Detective Group - Database Schema

This directory contains the complete database schema for the Pawan Detective Group Security Guard Management System.

## Files

- **schema.sql** - Complete PostgreSQL database schema with all tables, indexes, and triggers
- **seeds.sql** - Sample data for testing and development
- **README.md** - This file

## Database Overview

The database consists of 25+ tables supporting:

### Core Features
- **User Management** - Authentication and authorization
- **Guard Management** - Security guard profiles and information
- **Attendance Tracking** - Check-in/out and attendance records
- **Location Tracking** - Real-time GPS location monitoring
- **Site Management** - Client sites and locations

### Operational Features
- **Incident Management** - Incident logs with media attachments
- **Checkpoint System** - NFC/QR/Beacon checkpoint scans
- **Geofencing** - Virtual perimeters with entry/exit alerts
- **Shift Management** - Shift templates and scheduled shifts
- **Time Off Management** - Leave requests and shift swaps

### Advanced Features
- **SOS Alerts** - Emergency alerts from guards
- **Sleep Detection** - AI-powered sleep/inactivity alerts
- **AI Monitoring** - Camera-based AI alerts (intrusion, suspicious activity)
- **Checklists** - Patrol and safety checklists
- **Training Management** - Guard training and certifications
- **Camera Management** - CCTV and surveillance camera integration
- **Notifications** - Real-time notification system

## Setup Instructions

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE pawangroup_db;

# Create user (optional)
CREATE USER pawangroup_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE pawangroup_db TO pawangroup_user;

# Exit psql
\q
```

### 3. Run Schema

```bash
# Navigate to the database directory
cd /path/to/pawangroup-api/database

# Run schema.sql
psql -U postgres -d pawangroup_db -f schema.sql

# Or if using custom user:
psql -U pawangroup_user -d pawangroup_db -f schema.sql
```

### 4. Load Sample Data (Optional)

```bash
# Run seeds.sql for development/testing
psql -U postgres -d pawangroup_db -f seeds.sql
```

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=pawangroup_db

# Application
NODE_ENV=development
PORT=3000

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_key_here
```

### 6. Verify Installation

```bash
# Connect to database
psql -U postgres -d pawangroup_db

# List all tables
\dt

# Check user count
SELECT COUNT(*) FROM users;

# Exit
\q
```

## Database Tables

### Authentication & Users
- `users` - System users (admins, supervisors)

### Guard Management
- `guards` - Security guard profiles
- `attendance` - Daily attendance records
- `locations` - Real-time GPS tracking
- `guard_trainings` - Training assignments and completion

### Site & Shift Management
- `sites` - Client sites/locations
- `shift_templates` - Recurring shift patterns
- `scheduled_shifts` - Individual shift assignments
- `shift_swap_requests` - Shift exchange requests
- `time_off_requests` - Leave/time-off requests

### Security & Monitoring
- `incident_logs` - Security incidents
- `incident_media` - Incident photos/videos
- `checkpoints` - Physical checkpoints
- `checkpoint_scans` - Checkpoint scan logs
- `geofences` - Virtual perimeters
- `geofence_alerts` - Geofence breach alerts
- `cameras` - CCTV camera inventory

### Alerts & Notifications
- `sos_alerts` - Emergency SOS alerts
- `sleep_alerts` - Sleep/inactivity detection
- `ai_alerts` - AI-powered security alerts
- `notifications` - System notifications

### Operations & Compliance
- `checklists` - Checklist templates
- `checklist_items` - Checklist item definitions
- `checklist_submissions` - Completed checklists
- `trainings` - Training programs
- `guard_trainings` - Training enrollment/completion

## Indexes

The schema includes strategic indexes for optimal query performance on:
- Foreign keys
- Frequently queried columns (status, date, timestamp)
- User lookups (email, username)
- Location-based queries

## Triggers

Automatic `updated_at` timestamp updates on all tables with modification tracking.

## Data Types

- **UUID** - Primary keys using `gen_random_uuid()`
- **TIMESTAMP** - All date/time values
- **DECIMAL(10,6)** - GPS coordinates (latitude/longitude)
- **JSONB** - Flexible data storage (geofence polygons, checklist items)
- **ENUM** - Type-safe status fields

## Production Considerations

### Security
1. Use strong passwords
2. Enable SSL connections
3. Implement row-level security where needed
4. Regular security audits

### Performance
1. Monitor and optimize slow queries
2. Consider partitioning large tables (locations, attendance)
3. Implement archiving strategy for historical data
4. Regular VACUUM and ANALYZE

### Backup
```bash
# Backup database
pg_dump -U postgres pawangroup_db > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U postgres pawangroup_db < backup_20260121.sql
```

### Migrations

For production, use a migration tool:
```bash
npm install typeorm-migration-cli
npx typeorm migration:generate -n InitialSchema
```

## Support

For questions or issues:
- Email: admin@pawangroup.com
- Phone: +91 98868 29219

## License

Proprietary - Pawan Detective Group © 2026
