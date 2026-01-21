# Pawan Detective Group - API Documentation

## Base URL
```
http://localhost:3000
```

## API Endpoints

### 🔐 Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

---

### 👮 Guards
- `GET /guards` - Get all guards
  - Query params: `?status=active|inactive|on-leave` `?site={siteName}`
- `GET /guards/:id` - Get guard by ID
- `GET /guards/employee/:employeeId` - Get guard by employee ID
- `POST /guards` - Create new guard
- `PATCH /guards/:id` - Update guard
- `DELETE /guards/:id` - Delete guard

**Create Guard Example:**
```json
{
  "name": "John Doe",
  "employeeId": "EMP007",
  "phone": "+919876543210",
  "assignedSite": "Tech Park Gate A",
  "shift": "morning",
  "status": "active"
}
```

---

### 🏢 Sites
- `GET /sites` - Get all sites
  - Query params: `?active=true` `?client={clientName}`
- `GET /sites/:id` - Get site by ID
- `POST /sites` - Create new site
- `PATCH /sites/:id` - Update site
- `DELETE /sites/:id` - Delete site

**Create Site Example:**
```json
{
  "name": "Tech Park Main Gate",
  "address": "Electronic City, Bangalore",
  "clientName": "Tech Corp India",
  "contactPerson": "Suresh Kumar",
  "contactPhone": "+919876543211",
  "latitude": 12.8456,
  "longitude": 77.6603,
  "isActive": true
}
```

---

### 📅 Attendance
- `GET /attendance` - Get all attendance records
  - Query params: `?guardId={id}` `?date=YYYY-MM-DD` `?startDate=...&endDate=...` `?site={name}` `?status=present|absent|late|on-leave`
- `GET /attendance/:id` - Get attendance record by ID
- `POST /attendance` - Create attendance record
- `PATCH /attendance/:id` - Update attendance record
- `DELETE /attendance/:id` - Delete attendance record

**Create Attendance Example:**
```json
{
  "guardId": "uuid",
  "guardName": "John Doe",
  "date": "2026-01-21",
  "checkIn": "06:00:00",
  "checkOut": "14:00:00",
  "status": "present",
  "site": "Tech Park Gate A",
  "shift": "morning",
  "workHours": 8.0,
  "checkInLatitude": 12.8456,
  "checkInLongitude": 77.6603
}
```

---

### 🚨 Incidents
- `GET /incidents` - Get all incidents
  - Query params: `?guardId={id}` `?severity=low|medium|high|critical` `?status=new|reviewing|resolved|escalated` `?site={name}`
- `GET /incidents/:id` - Get incident by ID
- `POST /incidents` - Create new incident
- `PATCH /incidents/:id` - Update incident
- `DELETE /incidents/:id` - Delete incident

**Create Incident Example:**
```json
{
  "guardId": "uuid",
  "guardName": "John Doe",
  "title": "Suspicious Activity",
  "description": "Person loitering near parking area",
  "severity": "medium",
  "latitude": 12.8457,
  "longitude": 77.6604,
  "address": "Parking Area, Tech Park",
  "site": "Tech Park Gate A",
  "notes": "Person left after 10 minutes"
}
```

---

### 📍 Locations (Real-time Tracking)
- `GET /locations` - Get all locations
  - Query params: `?active=true`
- `GET /locations/guard/:guardId` - Get locations for guard
  - Query params: `?limit=100`
- `GET /locations/guard/:guardId/latest` - Get latest location for guard
- `POST /locations` - Create location record

**Create Location Example:**
```json
{
  "guardId": "uuid",
  "guardName": "John Doe",
  "latitude": 12.8456,
  "longitude": 77.6603,
  "address": "Near Main Gate",
  "isActive": true,
  "accuracy": 10.5,
  "speed": 0.0
}
```

---

### 📌 Checkpoints
- `GET /checkpoints` - Get all checkpoints
  - Query params: `?siteId={id}`
- `GET /checkpoints/:id` - Get checkpoint by ID
- `POST /checkpoints` - Create checkpoint
- `POST /checkpoints/scans` - Record checkpoint scan
- `GET /checkpoints/scans/all` - Get all scans
  - Query params: `?checkpointId={id}` `?guardId={id}`

**Create Checkpoint Example:**
```json
{
  "name": "Main Gate Entrance",
  "type": "qr",
  "siteId": "site-001",
  "siteName": "Tech Park Gate A",
  "latitude": 12.8456,
  "longitude": 77.6603,
  "isActive": true,
  "scanFrequency": 60
}
```

**Record Scan Example:**
```json
{
  "checkpointId": "uuid",
  "checkpointName": "Main Gate Entrance",
  "guardId": "uuid",
  "guardName": "John Doe",
  "latitude": 12.8456,
  "longitude": 77.6603,
  "status": "on-time",
  "notes": "All clear"
}
```

---

### 🕐 Shifts
**Shift Templates:**
- `GET /shifts/templates` - Get all shift templates
- `GET /shifts/templates/:id` - Get template by ID
- `POST /shifts/templates` - Create shift template

**Scheduled Shifts:**
- `GET /shifts/scheduled` - Get all scheduled shifts
  - Query params: `?guardId={id}` `?date=YYYY-MM-DD` `?siteId={id}`
- `GET /shifts/scheduled/:id` - Get scheduled shift by ID
- `POST /shifts/scheduled` - Create scheduled shift
- `PATCH /shifts/scheduled/:id/status` - Update shift status

**Create Shift Template Example:**
```json
{
  "name": "Morning Shift - Tech Park",
  "startTime": "06:00:00",
  "endTime": "14:00:00",
  "breakDuration": 30,
  "daysOfWeek": [1, 2, 3, 4, 5, 6],
  "siteId": "site-001",
  "siteName": "Tech Park Gate A",
  "requiredGuards": 2
}
```

**Create Scheduled Shift Example:**
```json
{
  "guardId": "uuid",
  "guardName": "John Doe",
  "siteId": "site-001",
  "siteName": "Tech Park Gate A",
  "date": "2026-01-22",
  "startTime": "06:00:00",
  "endTime": "14:00:00",
  "status": "scheduled"
}
```

---

### 🚨 Alerts

**SOS Alerts:**
- `GET /alerts/sos` - Get all SOS alerts
  - Query params: `?active=true`
- `POST /alerts/sos` - Create SOS alert
- `PATCH /alerts/sos/:id/status` - Update SOS alert status

**Sleep Alerts:**
- `GET /alerts/sleep` - Get all sleep alerts
- `POST /alerts/sleep` - Create sleep alert

**AI Alerts:**
- `GET /alerts/ai` - Get all AI alerts
  - Query params: `?siteId={id}`
- `POST /alerts/ai` - Create AI alert

**Create SOS Alert Example:**
```json
{
  "guardId": "uuid",
  "guardName": "John Doe",
  "latitude": 12.8456,
  "longitude": 77.6603,
  "address": "Tech Park Gate A",
  "notes": "Emergency situation"
}
```

**Create AI Alert Example:**
```json
{
  "type": "intrusion",
  "siteId": "site-001",
  "siteName": "Tech Park Gate A",
  "cameraId": "camera-001",
  "cameraName": "Main Gate Camera",
  "confidence": 95.5,
  "thumbnail": "https://...",
  "videoClip": "https://..."
}
```

---

### ✅ Operations

**Checklists:**
- `GET /operations/checklists` - Get all checklists
  - Query params: `?siteId={id}`
- `GET /operations/checklists/:id` - Get checklist by ID
- `POST /operations/checklists` - Create checklist

**Trainings:**
- `GET /operations/trainings` - Get all trainings
- `GET /operations/trainings/:id` - Get training by ID
- `POST /operations/trainings` - Create training
- `POST /operations/guard-trainings` - Assign training to guard
- `GET /operations/guard-trainings/:guardId` - Get guard's trainings

**Create Checklist Example:**
```json
{
  "name": "Morning Patrol Checklist",
  "siteId": "site-001",
  "siteName": "Tech Park Gate A",
  "type": "patrol",
  "items": [
    {
      "description": "Check main gate lock",
      "isRequired": true,
      "order": 1
    },
    {
      "description": "Verify CCTV cameras",
      "isRequired": true,
      "order": 2
    }
  ]
}
```

**Create Training Example:**
```json
{
  "name": "Fire Safety Training",
  "description": "Basic fire safety and emergency procedures",
  "type": "mandatory",
  "duration": 4.0,
  "validityPeriod": 12
}
```

---

### 🔔 Notifications
- `GET /notifications` - Get all notifications
  - Query params: `?userId={id}` `?unread=true`
- `POST /notifications` - Create notification
- `PATCH /notifications/:id/read` - Mark notification as read
- `PATCH /notifications/user/:userId/read-all` - Mark all as read for user

**Create Notification Example:**
```json
{
  "type": "incident",
  "title": "New Incident Reported",
  "message": "Suspicious activity at Tech Park Gate A",
  "priority": "high",
  "relatedId": "incident-uuid",
  "relatedType": "incident",
  "userId": "user-uuid"
}
```

---

## Response Format

### Success Response
```json
{
  "id": "uuid",
  "name": "...",
  "createdAt": "2026-01-21T10:00:00Z",
  "updatedAt": "2026-01-21T10:00:00Z"
}
```

### Error Response
```json
{
  "statusCode": 404,
  "message": "Guard with ID xyz not found",
  "error": "Not Found"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Query Parameters Guide

### Common Query Parameters

**Filtering:**
- `?status=active` - Filter by status
- `?siteId=uuid` - Filter by site
- `?guardId=uuid` - Filter by guard
- `?date=YYYY-MM-DD` - Filter by specific date
- `?startDate=...&endDate=...` - Filter by date range

**Pagination (to be implemented):**
- `?page=1&limit=50` - Paginate results

---

## Development Setup

1. Install dependencies:
```bash
cd pawangroup-api
npm install
```

2. Configure environment variables in `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=pawangroup_db
NODE_ENV=development
PORT=3000
```

3. Run database migrations:
```bash
psql -U postgres -d pawangroup_db -f database/schema.sql
psql -U postgres -d pawangroup_db -f database/seeds.sql
```

4. Start the server:
```bash
npm run start:dev
```

---

## Testing Endpoints

Use the provided `api-test.http` file with REST Client extension in VS Code, or use tools like Postman/Insomnia.

---

## Notes

- All timestamps are in UTC
- All IDs are UUIDs
- Location coordinates use decimal degrees (latitude/longitude)
- Entity relationships are automatically handled by TypeORM
- Validation is handled by class-validator decorators

---

For more information, see [README.md](README.md) and [API_ENDPOINTS.md](API_ENDPOINTS.md)
