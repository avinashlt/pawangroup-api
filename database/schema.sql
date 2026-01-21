-- Pawan Detective Group - Database Schema
-- PostgreSQL Database Schema for Security Guard Management System

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('supervisor', 'admin')),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- ============================================
-- SITES TABLE
-- ============================================
CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    contact_phone VARCHAR(20),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sites_name ON sites(name);
CREATE INDEX idx_sites_client_name ON sites(client_name);

-- ============================================
-- GUARDS TABLE
-- ============================================
CREATE TABLE guards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    photo TEXT,
    assigned_site VARCHAR(255),
    shift VARCHAR(50) CHECK (shift IN ('morning', 'evening', 'night')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on-leave')),
    address TEXT,
    date_of_joining DATE,
    date_of_birth DATE,
    emergency_contact VARCHAR(20),
    emergency_contact_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guards_employee_id ON guards(employee_id);
CREATE INDEX idx_guards_status ON guards(status);
CREATE INDEX idx_guards_assigned_site ON guards(assigned_site);

-- ============================================
-- ATTENDANCE TABLE
-- ============================================
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(50) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'on-leave')),
    site VARCHAR(255) NOT NULL,
    shift VARCHAR(50) NOT NULL,
    work_hours DECIMAL(5, 2),
    check_in_latitude DECIMAL(10, 6),
    check_in_longitude DECIMAL(10, 6),
    check_out_latitude DECIMAL(10, 6),
    check_out_longitude DECIMAL(10, 6),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attendance_guard_id ON attendance(guard_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_status ON attendance(status);

-- ============================================
-- LOCATIONS TABLE (Real-time tracking)
-- ============================================
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    accuracy DECIMAL(5, 2),
    speed DECIMAL(5, 2),
    heading DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_locations_guard_id ON locations(guard_id);
CREATE INDEX idx_locations_timestamp ON locations(timestamp);
CREATE INDEX idx_locations_is_active ON locations(is_active);

-- ============================================
-- INCIDENT LOGS TABLE
-- ============================================
CREATE TABLE incident_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    timestamp TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    address TEXT,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'resolved', 'escalated')),
    site VARCHAR(255) NOT NULL,
    resolved_by VARCHAR(255),
    resolved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incident_logs_guard_id ON incident_logs(guard_id);
CREATE INDEX idx_incident_logs_severity ON incident_logs(severity);
CREATE INDEX idx_incident_logs_status ON incident_logs(status);
CREATE INDEX idx_incident_logs_timestamp ON incident_logs(timestamp);

-- ============================================
-- INCIDENT MEDIA TABLE
-- ============================================
CREATE TABLE incident_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_log_id UUID NOT NULL REFERENCES incident_logs(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    thumbnail TEXT,
    uploaded_at TIMESTAMP NOT NULL,
    size BIGINT,
    duration INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_incident_media_incident_log_id ON incident_media(incident_log_id);

-- ============================================
-- CHECKPOINTS TABLE
-- ============================================
CREATE TABLE checkpoints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('nfc', 'qr', 'beacon')),
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    scan_frequency INTEGER NOT NULL,
    last_scanned TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_checkpoints_site_id ON checkpoints(site_id);
CREATE INDEX idx_checkpoints_is_active ON checkpoints(is_active);

-- ============================================
-- CHECKPOINT SCANS TABLE
-- ============================================
CREATE TABLE checkpoint_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checkpoint_id UUID NOT NULL REFERENCES checkpoints(id) ON DELETE CASCADE,
    checkpoint_name VARCHAR(255) NOT NULL,
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    scanned_at TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('on-time', 'late', 'missed')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_checkpoint_scans_checkpoint_id ON checkpoint_scans(checkpoint_id);
CREATE INDEX idx_checkpoint_scans_guard_id ON checkpoint_scans(guard_id);
CREATE INDEX idx_checkpoint_scans_scanned_at ON checkpoint_scans(scanned_at);

-- ============================================
-- GEOFENCES TABLE
-- ============================================
CREATE TABLE geofences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('circle', 'polygon')),
    center_latitude DECIMAL(10, 6),
    center_longitude DECIMAL(10, 6),
    radius DECIMAL(10, 2),
    polygon JSONB,
    is_active BOOLEAN DEFAULT true,
    alert_on_exit BOOLEAN DEFAULT false,
    alert_on_entry BOOLEAN DEFAULT false,
    assigned_guards TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_geofences_site_id ON geofences(site_id);
CREATE INDEX idx_geofences_is_active ON geofences(is_active);

-- ============================================
-- GEOFENCE ALERTS TABLE
-- ============================================
CREATE TABLE geofence_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    geofence_id UUID NOT NULL REFERENCES geofences(id) ON DELETE CASCADE,
    geofence_name VARCHAR(255) NOT NULL,
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('entry', 'exit')),
    timestamp TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    acknowledged BOOLEAN DEFAULT false,
    acknowledged_by VARCHAR(255),
    acknowledged_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_geofence_alerts_geofence_id ON geofence_alerts(geofence_id);
CREATE INDEX idx_geofence_alerts_guard_id ON geofence_alerts(guard_id);
CREATE INDEX idx_geofence_alerts_acknowledged ON geofence_alerts(acknowledged);

-- ============================================
-- SHIFT TEMPLATES TABLE
-- ============================================
CREATE TABLE shift_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_duration INTEGER NOT NULL,
    days_of_week INTEGER[],
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    required_guards INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shift_templates_site_id ON shift_templates(site_id);
CREATE INDEX idx_shift_templates_is_active ON shift_templates(is_active);

-- ============================================
-- SCHEDULED SHIFTS TABLE
-- ============================================
CREATE TABLE scheduled_shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES shift_templates(id) ON DELETE SET NULL,
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled')),
    check_in_time TIME,
    check_out_time TIME,
    check_in_latitude DECIMAL(10, 6),
    check_in_longitude DECIMAL(10, 6),
    check_out_latitude DECIMAL(10, 6),
    check_out_longitude DECIMAL(10, 6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scheduled_shifts_guard_id ON scheduled_shifts(guard_id);
CREATE INDEX idx_scheduled_shifts_date ON scheduled_shifts(date);
CREATE INDEX idx_scheduled_shifts_status ON scheduled_shifts(status);

-- ============================================
-- SHIFT SWAP REQUESTS TABLE
-- ============================================
CREATE TABLE shift_swap_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id VARCHAR(255) NOT NULL,
    requester_name VARCHAR(255) NOT NULL,
    target_guard_id VARCHAR(255) NOT NULL,
    target_guard_name VARCHAR(255) NOT NULL,
    original_shift_id VARCHAR(255) NOT NULL,
    swap_shift_id VARCHAR(255) NOT NULL,
    original_date DATE NOT NULL,
    swap_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_at TIMESTAMP NOT NULL,
    processed_by VARCHAR(255),
    processed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shift_swap_requests_requester_id ON shift_swap_requests(requester_id);
CREATE INDEX idx_shift_swap_requests_status ON shift_swap_requests(status);

-- ============================================
-- TIME OFF REQUESTS TABLE
-- ============================================
CREATE TABLE time_off_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('sick', 'vacation', 'personal', 'emergency')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    requested_at TIMESTAMP NOT NULL,
    processed_by VARCHAR(255),
    processed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_time_off_requests_guard_id ON time_off_requests(guard_id);
CREATE INDEX idx_time_off_requests_status ON time_off_requests(status);

-- ============================================
-- SOS ALERTS TABLE
-- ============================================
CREATE TABLE sos_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    address TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'responding', 'resolved', 'false-alarm')),
    priority VARCHAR(50) DEFAULT 'critical',
    responded_by VARCHAR(255),
    responded_at TIMESTAMP,
    resolved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sos_alerts_guard_id ON sos_alerts(guard_id);
CREATE INDEX idx_sos_alerts_status ON sos_alerts(status);
CREATE INDEX idx_sos_alerts_timestamp ON sos_alerts(timestamp);

-- ============================================
-- SLEEP ALERTS TABLE
-- ============================================
CREATE TABLE sleep_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    detected_at TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'false-positive')),
    acknowledged_by VARCHAR(255),
    acknowledged_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sleep_alerts_guard_id ON sleep_alerts(guard_id);
CREATE INDEX idx_sleep_alerts_status ON sleep_alerts(status);

-- ============================================
-- AI ALERTS TABLE
-- ============================================
CREATE TABLE ai_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL CHECK (type IN ('intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection')),
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    camera_id VARCHAR(255) NOT NULL,
    camera_name VARCHAR(255) NOT NULL,
    detected_at TIMESTAMP NOT NULL,
    confidence DECIMAL(5, 2) NOT NULL,
    thumbnail TEXT,
    video_clip TEXT,
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'confirmed', 'false-positive')),
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_alerts_site_id ON ai_alerts(site_id);
CREATE INDEX idx_ai_alerts_status ON ai_alerts(status);
CREATE INDEX idx_ai_alerts_detected_at ON ai_alerts(detected_at);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    is_read BOOLEAN DEFAULT false,
    priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    related_id VARCHAR(255),
    related_type VARCHAR(100),
    user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_timestamp ON notifications(timestamp);

-- ============================================
-- CHECKLISTS TABLE
-- ============================================
CREATE TABLE checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('patrol', 'opening', 'closing', 'safety', 'custom')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_checklists_site_id ON checklists(site_id);
CREATE INDEX idx_checklists_is_active ON checklists(is_active);

-- ============================================
-- CHECKLIST ITEMS TABLE
-- ============================================
CREATE TABLE checklist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    is_required BOOLEAN DEFAULT true,
    "order" INTEGER NOT NULL
);

CREATE INDEX idx_checklist_items_checklist_id ON checklist_items(checklist_id);

-- ============================================
-- CHECKLIST SUBMISSIONS TABLE
-- ============================================
CREATE TABLE checklist_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    checklist_id UUID NOT NULL REFERENCES checklists(id) ON DELETE CASCADE,
    checklist_name VARCHAR(255) NOT NULL,
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP NOT NULL,
    completed_items JSONB NOT NULL,
    overall_notes TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('complete', 'incomplete')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_checklist_submissions_checklist_id ON checklist_submissions(checklist_id);
CREATE INDEX idx_checklist_submissions_guard_id ON checklist_submissions(guard_id);

-- ============================================
-- TRAININGS TABLE
-- ============================================
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('mandatory', 'optional', 'certification')),
    duration DECIMAL(5, 2) NOT NULL,
    validity_period INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trainings_type ON trainings(type);
CREATE INDEX idx_trainings_is_active ON trainings(is_active);

-- ============================================
-- GUARD TRAININGS TABLE
-- ============================================
CREATE TABLE guard_trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guard_id UUID NOT NULL REFERENCES guards(id) ON DELETE CASCADE,
    guard_name VARCHAR(255) NOT NULL,
    training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    training_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed', 'expired')),
    assigned_at TIMESTAMP NOT NULL,
    due_date DATE NOT NULL,
    completed_at TIMESTAMP,
    expires_at DATE,
    score DECIMAL(5, 2),
    certificate TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_guard_trainings_guard_id ON guard_trainings(guard_id);
CREATE INDEX idx_guard_trainings_training_id ON guard_trainings(training_id);
CREATE INDEX idx_guard_trainings_status ON guard_trainings(status);

-- ============================================
-- CAMERAS TABLE
-- ============================================
CREATE TABLE cameras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    site_id VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('indoor', 'outdoor', 'ptz')),
    is_online BOOLEAN DEFAULT false,
    ai_enabled BOOLEAN DEFAULT false,
    last_seen TIMESTAMP NOT NULL,
    stream_url TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cameras_site_id ON cameras(site_id);
CREATE INDEX idx_cameras_is_online ON cameras(is_online);

-- ============================================
-- TRIGGER FUNCTIONS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guards_updated_at BEFORE UPDATE ON guards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incident_logs_updated_at BEFORE UPDATE ON incident_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_checkpoints_updated_at BEFORE UPDATE ON checkpoints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_geofences_updated_at BEFORE UPDATE ON geofences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shift_templates_updated_at BEFORE UPDATE ON shift_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scheduled_shifts_updated_at BEFORE UPDATE ON scheduled_shifts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shift_swap_requests_updated_at BEFORE UPDATE ON shift_swap_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_off_requests_updated_at BEFORE UPDATE ON time_off_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sos_alerts_updated_at BEFORE UPDATE ON sos_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sleep_alerts_updated_at BEFORE UPDATE ON sleep_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_alerts_updated_at BEFORE UPDATE ON ai_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_checklists_updated_at BEFORE UPDATE ON checklists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guard_trainings_updated_at BEFORE UPDATE ON guard_trainings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cameras_updated_at BEFORE UPDATE ON cameras FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
