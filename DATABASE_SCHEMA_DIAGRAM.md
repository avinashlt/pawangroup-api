# Database Schema Diagram & Table Mapping
## Pawan Detective Group - Security Guard Management System

---

## 📊 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        SECURITY GUARD MANAGEMENT SYSTEM                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

                                    ┌────────────────┐
                                    │    USERS       │
                                    │  (Admin/Super) │
                                    └────────────────┘

                    ┌──────────────────────────────────────┐
                    │                                      │
                    ▼                                      ▼
            ┌─────────────────┐               ┌────────────────────┐
            │     SITES       │               │     GUARDS         │
            │  (Client Locs)  │               │ (Security Guards)  │
            └─────────────────┘               └────────────────────┘
                    │                                 │  │  │  │
                    │                 ┌───────────────┼──┼──┼──┘
                    │                 │               │  │  │
                    ▼                 ▼               ▼  ▼  ▼
            ┌─────────────────┐  ┌────────────┐ ┌──────────────┐
            │  CHECKPOINTS    │  │ATTENDANCE  │ │ LOCATIONS    │
            │  (NFC/QR/BLE)   │  │(Check-in)  │ │(Real-time)   │
            └─────────────────┘  └────────────┘ └──────────────┘
                    │                                 │
                    ▼                                 ▼
            ┌─────────────────┐               ┌──────────────┐
            │ CHECK_SCANS     │               │  GEOFENCES   │
            │(Compliance)     │               │(Zones)       │
            └─────────────────┘               └──────────────┘
                                                    │
                                                    ▼
                                            ┌──────────────┐
                                            │GEOFENCE_ALERTS│
                                            │(Entry/Exit)   │
                                            └──────────────┘

    ┌─────────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌──────────────┐               ┌────────────────┐
│ INCIDENT_    │               │  SOS_ALERTS    │
│   LOGS       │               │  (Emergency)   │
└──────────────┘               └────────────────┘
    │
    ▼
┌──────────────┐
│INCIDENT_     │
│  MEDIA       │
│ (Images/Vids)│
└──────────────┘

    ┌─────────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌──────────────┐               ┌────────────────┐
│SLEEP_ALERTS  │               │ AI_ALERTS      │
│(Detection)   │               │(Computer Vision)│
└──────────────┘               └────────────────┘

    ┌─────────────────────────────────────┐
    │                                     │
    ▼                                     ▼
┌──────────────┐               ┌────────────────┐
│SHIFT_        │               │SCHEDULED_      │
│TEMPLATES     │               │SHIFTS          │
└──────────────┘               └────────────────┘
                                    │
                                    ▼
                            ┌────────────────┐
                            │SHIFT_SWAP_     │
                            │REQUESTS        │
                            └────────────────┘

    ┌──────────────┐               ┌────────────────┐
    │TIME_OFF_     │               │NOTIFICATIONS   │
    │REQUESTS      │               │(Multi-type)    │
    └──────────────┘               └────────────────┘

    ┌────────────────┐               ┌────────────────┐
    │  CHECKLISTS    │               │  TRAININGS     │
    │ (Patrol/Open)  │               │ (Mandatory)    │
    └────────────────┘               └────────────────┘
            │                                │
            ▼                                ▼
    ┌────────────────┐               ┌────────────────┐
    │CHECKLIST_ITEMS │               │GUARD_TRAININGS│
    │ (Task list)    │               │(Assignments)   │
    └────────────────┘               └────────────────┘
            │
            ▼
    ┌────────────────┐
    │CHECKLIST_      │
    │SUBMISSIONS     │
    │ (Completed)    │
    └────────────────┘

    ┌────────────────┐
    │   CAMERAS      │
    │ (Monitoring)   │
    └────────────────┘
```

---

## 🗂️ Table Categories & Hierarchy

### 1. **CORE MANAGEMENT TABLES**
```
USERS
├── id (UUID) - Primary Key
├── username, email - Unique identifiers
├── name, phone, role (admin/supervisor)
├── is_active, created_at, updated_at
└── Indexes: email, username
```

### 2. **SITE & LOCATION TABLES**
```
SITES (Client Locations)
├── id (UUID)
├── name, address, client_name
├── contact_person, contact_phone
├── latitude, longitude (for mapping)
├── is_active
└── Indexes: name, client_name

LOCATIONS (Real-time Guard Tracking)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── latitude, longitude, timestamp
├── accuracy, speed, heading
├── is_active
└── Indexes: guard_id, timestamp, is_active
```

### 3. **GUARD MANAGEMENT TABLES**
```
GUARDS (Security Personnel)
├── id (UUID)
├── name, employee_id (unique), phone
├── assigned_site, shift (morning/evening/night)
├── status (active/inactive/on-leave)
├── photo, address, DOB, joining_date
├── emergency_contact, emergency_contact_name
└── Indexes: employee_id, status, assigned_site

ATTENDANCE (Check-in/Check-out)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── guard_name, date, check_in, check_out
├── status (present/absent/late/on-leave)
├── site, shift, work_hours
├── check_in_latitude, check_in_longitude
├── check_out_latitude, check_out_longitude
└── Indexes: guard_id, date, status
```

### 4. **CHECKPOINT & COMPLIANCE TABLES**
```
CHECKPOINTS (NFC/QR/Beacon Points)
├── id (UUID)
├── name, type (nfc/qr/beacon)
├── site_id, site_name
├── latitude, longitude, address
├── scan_frequency, last_scanned
├── is_active
└── Indexes: site_id, is_active

CHECKPOINT_SCANS (Patrol Records)
├── id (UUID)
├── checkpoint_id → CHECKPOINTS (FK)
├── guard_id → GUARDS (FK)
├── scanned_at, latitude, longitude
├── status (on-time/late/missed)
├── checkpoint_name, guard_name
└── Indexes: checkpoint_id, guard_id, scanned_at
```

### 5. **GEOFENCE & ZONE MANAGEMENT TABLES**
```
GEOFENCES (Virtual Boundaries)
├── id (UUID)
├── name, site_id, site_name
├── type (circle/polygon)
├── center_latitude, center_longitude, radius
├── polygon (JSONB for complex shapes)
├── assigned_guards (array)
├── alert_on_entry, alert_on_exit
└── Indexes: site_id, is_active

GEOFENCE_ALERTS (Boundary Events)
├── id (UUID)
├── geofence_id → GEOFENCES (FK)
├── guard_id → GUARDS (FK)
├── alert_type (entry/exit)
├── timestamp, latitude, longitude
├── acknowledged, acknowledged_by, acknowledged_at
└── Indexes: geofence_id, guard_id, acknowledged
```

### 6. **INCIDENT MANAGEMENT TABLES**
```
INCIDENT_LOGS (Security Incidents)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── guard_name, title, description
├── severity (low/medium/high/critical)
├── timestamp, latitude, longitude, address
├── status (new/reviewing/resolved/escalated)
├── site, resolved_by, resolved_at, notes
└── Indexes: guard_id, severity, status, timestamp

INCIDENT_MEDIA (Supporting Evidence)
├── id (UUID)
├── incident_log_id → INCIDENT_LOGS (FK)
├── type (image/video)
├── url, thumbnail, size, duration
├── uploaded_at
└── Indexes: incident_log_id
```

### 7. **ALERT SYSTEMS TABLES**
```
SOS_ALERTS (Emergency Distress Calls)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── guard_name, timestamp
├── latitude, longitude, address
├── status (active/responding/resolved/false-alarm)
├── priority (critical)
├── responded_by, responded_at, resolved_at
└── Indexes: guard_id, status, timestamp

SLEEP_ALERTS (Fatigue Detection)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── guard_name, site_id, site_name
├── detected_at, duration (in minutes)
├── latitude, longitude
├── status (active/acknowledged/false-positive)
├── acknowledged_by, acknowledged_at
└── Indexes: guard_id, status

AI_ALERTS (Computer Vision Alerts)
├── id (UUID)
├── type (intrusion/suspicious-activity/unauthorized-access)
├── site_id, site_name, camera_id, camera_name
├── detected_at, confidence (0-100)
├── thumbnail, video_clip
├── status (new/reviewing/confirmed/false-positive)
├── reviewed_by, reviewed_at, notes
└── Indexes: site_id, status, detected_at
```

### 8. **SHIFT MANAGEMENT TABLES**
```
SHIFT_TEMPLATES (Schedule Patterns)
├── id (UUID)
├── name, start_time, end_time
├── break_duration (minutes)
├── days_of_week (array)
├── site_id, site_name
├── required_guards
├── is_active
└── Indexes: site_id, is_active

SCHEDULED_SHIFTS (Assigned Shifts)
├── id (UUID)
├── template_id → SHIFT_TEMPLATES (FK)
├── guard_id → GUARDS (FK)
├── guard_name, site_id, site_name
├── date, start_time, end_time
├── status (scheduled/confirmed/in-progress/completed/cancelled)
├── check_in_time, check_out_time
├── check_in_lat/long, check_out_lat/long
└── Indexes: guard_id, date, status

SHIFT_SWAP_REQUESTS (Shift Exchanges)
├── id (UUID)
├── requester_id, requester_name
├── target_guard_id, target_guard_name
├── original_shift_id, swap_shift_id
├── original_date, swap_date
├── reason, status (pending/approved/rejected)
├── requested_at, processed_by, processed_at
└── Indexes: requester_id, status

TIME_OFF_REQUESTS (Leave Requests)
├── id (UUID)
├── guard_id, guard_name
├── type (sick/vacation/personal/emergency)
├── start_date, end_date
├── reason, status (pending/approved/rejected)
├── requested_at, processed_by, processed_at
└── Indexes: guard_id, status
```

### 9. **OPERATIONS & COMPLIANCE TABLES**
```
CHECKLISTS (Operational Tasks)
├── id (UUID)
├── name, site_id, site_name
├── type (patrol/opening/closing/safety/custom)
├── is_active
└── Indexes: site_id, is_active

CHECKLIST_ITEMS (Individual Tasks)
├── id (UUID)
├── checklist_id → CHECKLISTS (FK)
├── description, is_required, order
└── Indexes: checklist_id

CHECKLIST_SUBMISSIONS (Completed Tasks)
├── id (UUID)
├── checklist_id → CHECKLISTS (FK)
├── guard_id → GUARDS (FK)
├── checklist_name, guard_name
├── site_id, site_name, submitted_at
├── completed_items (JSONB - task status)
├── overall_notes, status (complete/incomplete)
└── Indexes: checklist_id, guard_id

TRAININGS (Training Programs)
├── id (UUID)
├── name, description
├── type (mandatory/optional/certification)
├── duration (hours), validity_period (months)
├── is_active
└── Indexes: type, is_active

GUARD_TRAININGS (Training Assignments)
├── id (UUID)
├── guard_id → GUARDS (FK)
├── training_id → TRAININGS (FK)
├── guard_name, training_name
├── status (not-started/in-progress/completed/expired)
├── assigned_at, due_date, completed_at, expires_at
├── score, certificate
└── Indexes: guard_id, training_id, status
```

### 10. **MONITORING TABLES**
```
CAMERAS (Security Cameras)
├── id (UUID)
├── name, site_id, site_name
├── location, type (indoor/outdoor/ptz)
├── is_online, ai_enabled
├── last_seen, stream_url, ip_address
└── Indexes: site_id, is_online

NOTIFICATIONS (System Alerts)
├── id (UUID)
├── type (shift-confirmation/clock-in/incident/sos)
├── title, message, timestamp
├── is_read, priority (low/medium/high/critical)
├── related_id, related_type, user_id
└── Indexes: user_id, is_read, timestamp
```

---

## 🔗 Foreign Key Relationships

| Table | Foreign Key | References | Action |
|-------|-------------|-----------|--------|
| ATTENDANCE | guard_id | GUARDS(id) | CASCADE |
| LOCATIONS | guard_id | GUARDS(id) | CASCADE |
| INCIDENT_LOGS | guard_id | GUARDS(id) | CASCADE |
| INCIDENT_MEDIA | incident_log_id | INCIDENT_LOGS(id) | CASCADE |
| CHECKPOINT_SCANS | checkpoint_id | CHECKPOINTS(id) | CASCADE |
| CHECKPOINT_SCANS | guard_id | GUARDS(id) | CASCADE |
| GEOFENCE_ALERTS | geofence_id | GEOFENCES(id) | CASCADE |
| GEOFENCE_ALERTS | guard_id | GUARDS(id) | CASCADE |
| SCHEDULED_SHIFTS | template_id | SHIFT_TEMPLATES(id) | SET NULL |
| SCHEDULED_SHIFTS | guard_id | GUARDS(id) | CASCADE |
| SOS_ALERTS | guard_id | GUARDS(id) | CASCADE |
| SLEEP_ALERTS | guard_id | GUARDS(id) | CASCADE |
| CHECKLIST_ITEMS | checklist_id | CHECKLISTS(id) | CASCADE |
| CHECKLIST_SUBMISSIONS | checklist_id | CHECKLISTS(id) | CASCADE |
| CHECKLIST_SUBMISSIONS | guard_id | GUARDS(id) | CASCADE |
| GUARD_TRAININGS | guard_id | GUARDS(id) | CASCADE |
| GUARD_TRAININGS | training_id | TRAININGS(id) | CASCADE |

---

## 📈 Data Flow Architecture

### Guard Attendance Flow
```
GUARDS → ATTENDANCE (check-in/out)
              ↓
         LOCATIONS (GPS tracking)
              ↓
       CHECKPOINT_SCANS (compliance)
              ↓
        NOTIFICATIONS (alert user)
```

### Incident Management Flow
```
GUARDS → INCIDENT_LOGS (report incident)
              ↓
       INCIDENT_MEDIA (attach evidence)
              ↓
        NOTIFICATIONS (escalate)
              ↓
         SOS_ALERTS (if emergency)
```

### Alert System Flow
```
GEOFENCES → GEOFENCE_ALERTS (boundary breach)
                  ↓
            NOTIFICATIONS

CAMERAS → AI_ALERTS (anomaly detected)
              ↓
         NOTIFICATIONS

GUARDS → SLEEP_ALERTS (fatigue detected)
              ↓
         NOTIFICATIONS
```

### Shift Management Flow
```
SHIFT_TEMPLATES → SCHEDULED_SHIFTS (assign)
                        ↓
                  GUARDS (confirm)
                        ↓
                  ATTENDANCE (record)
                        ↓
                  SHIFT_SWAP_REQUESTS (modify)
```

---

## 🔑 Primary Key Strategy

- **All tables use UUID as Primary Key**: `gen_random_uuid()`
- **Unique Constraints**: 
  - users.username
  - users.email
  - guards.employee_id
- **Composite Keys**: None (all UUID-based)

---

## 📊 Indexing Strategy

**High-Priority Indexes** (Performance Critical):
- `users(email)` - Authentication lookups
- `guards(employee_id)` - Quick guard identification
- `guards(status)` - Filter active guards
- `attendance(guard_id, date)` - Daily attendance reports
- `incident_logs(severity, status)` - Critical incident filtering
- `locations(guard_id, timestamp)` - Real-time tracking
- `checkpoint_scans(checkpoint_id, guard_id)` - Compliance reports
- `scheduled_shifts(guard_id, date)` - Schedule lookups
- `notifications(user_id, is_read)` - Notification retrieval

**Moderate-Priority Indexes**:
- `sites(name, client_name)` - Site search
- `geofences(site_id)` - Zone management
- `checklists(site_id)` - Task management
- `cameras(site_id)` - Camera management

---

## 🔄 Timestamp Audit Trail

**All tables have**:
```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP (AUTO-UPDATED VIA TRIGGER)
```

**Auto-Update Trigger**: 
```sql
update_<table>_updated_at
  → Executes before UPDATE
  → Sets NEW.updated_at = CURRENT_TIMESTAMP
```

---

## 💾 Data Type Specifications

| Type | Usage | Tables |
|------|-------|--------|
| UUID | Primary/Foreign Keys | All tables |
| VARCHAR(255) | Names, titles, locations | Most tables |
| TEXT | Long descriptions, addresses | incident_logs, notes |
| DATE | Date-only values | attendance.date, scheduled_shifts.date |
| TIME | Time-only values | shift_templates.start_time |
| TIMESTAMP | Date + time with microseconds | All created_at/updated_at |
| DECIMAL(10,6) | GPS coordinates | locations, geofences |
| DECIMAL(5,2) | Scores, confidence, accuracy | Multiple |
| INTEGER | Counts, durations | shift_templates.break_duration |
| BOOLEAN | Flags (is_active, is_read) | Most tables |
| JSONB | Flexible data (checklist items) | checklist_submissions, geofences |
| TEXT[] | Array of IDs/names | geofences.assigned_guards |
| BIGINT | File sizes | incident_media.size |

---

## 🎯 Query Optimization Tips

1. **Always filter by**: `guard_id`, `date`, `status` (most selective)
2. **Use pagination**: Limit results with `LIMIT offset, count`
3. **Join strategy**: 
   - GUARDS ← JOIN ← ATTENDANCE/LOCATIONS (never the reverse)
   - CHECKLISTS ← JOIN ← CHECKLIST_ITEMS/SUBMISSIONS
4. **Common reports**:
   - Daily attendance: `WHERE date = ? AND status IN (...)`
   - Guard history: `WHERE guard_id = ? AND created_at BETWEEN ? AND ?`
   - Active alerts: `WHERE status IN ('active', 'new') ORDER BY timestamp DESC`

---

## 📋 Schema Statistics

| Metric | Count |
|--------|-------|
| Total Tables | 25 |
| Core Management | 1 (USERS) |
| Location & Site | 2 |
| Guard Management | 2 |
| Checkpoints | 2 |
| Geofences | 2 |
| Incidents | 2 |
| Alerts | 3 |
| Shifts | 4 |
| Operations | 6 |
| Monitoring | 2 |
| **Total Indexes** | **45+** |
| **Foreign Keys** | **17** |
| **Triggers** | **18** |

---

## 🚀 Scalability Considerations

1. **Partitioning Recommendation**: 
   - ATTENDANCE, LOCATIONS, INCIDENT_LOGS by date (monthly)
   - NOTIFICATIONS by created_at (quarterly)

2. **Archive Strategy**:
   - Move incidents older than 1 year to archive table
   - Keep recent 2 years active

3. **Read Replicas**:
   - Real-time dashboards → Read replica
   - Historical reports → Read replica

4. **Caching**:
   - Cache `SITES`, `SHIFT_TEMPLATES`, `TRAININGS` (rarely change)
   - Cache last 24h `LOCATIONS` in Redis

---

## 🔐 Security Notes

- UUIDs prevent ID enumeration attacks
- CASCADE DELETE ensures data integrity
- All timestamps auto-managed by triggers
- No soft deletes (physical deletion with CASCADE)
- Consider adding `deleted_at` for audit trail if needed

