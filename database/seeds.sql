-- Pawan Detective Group - Sample Data Seeds
-- PostgreSQL seed data for testing and development

-- ============================================
-- SEED USERS
-- ============================================
-- Password: admin123 (bcrypt hashed)
INSERT INTO users (id, username, email, name, password, role, phone, is_active) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', 'admin@pawangroup.com', 'Admin User', '$2b$10$rBV2NlJmvRr7W7QrLIR9PeVDhj.pQ8h7d0q4L6zZ7SqXKzEDp8Lpm', 'admin', '+919886829219', true),
('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'supervisor1', 'supervisor1@pawangroup.com', 'Rajesh Sharma', '$2b$10$rBV2NlJmvRr7W7QrLIR9PeVDhj.pQ8h7d0q4L6zZ7SqXKzEDp8Lpm', 'supervisor', '+919876543210', true);

-- ============================================
-- SEED SITES
-- ============================================
INSERT INTO sites (id, name, address, client_name, contact_person, contact_phone, latitude, longitude, is_active) VALUES
('site-001', 'Tech Park Gate A', 'Electronic City Phase 1, Bangalore', 'Tech Corp India', 'Suresh Kumar', '+919876543211', 12.8456, 77.6603, true),
('site-002', 'Tech Park Gate B', 'Electronic City Phase 1, Bangalore', 'Tech Corp India', 'Suresh Kumar', '+919876543211', 12.8458, 77.6605, true),
('site-003', 'Corporate Office Main', 'MG Road, Bangalore', 'Global Solutions Ltd', 'Amit Patel', '+919876543212', 12.9716, 77.5946, true),
('site-004', 'Corporate Office Parking', 'MG Road, Bangalore', 'Global Solutions Ltd', 'Amit Patel', '+919876543212', 12.9714, 77.5944, true),
('site-005', 'Warehouse Zone 1', 'Whitefield Industrial Area, Bangalore', 'Logistics Pro', 'Vijay Singh', '+919876543213', 12.9698, 77.7499, true),
('site-006', 'Warehouse Zone 2', 'Whitefield Industrial Area, Bangalore', 'Logistics Pro', 'Vijay Singh', '+919876543213', 12.9700, 77.7501, true);

-- ============================================
-- SEED GUARDS
-- ============================================
INSERT INTO guards (id, name, employee_id, phone, assigned_site, shift, status, date_of_joining, emergency_contact, emergency_contact_name) VALUES
('guard-001', 'Rajesh Kumar', 'EMP001', '+919876543220', 'Tech Park Gate A', 'morning', 'active', '2023-01-15', '+919876543230', 'Lakshmi Kumar'),
('guard-002', 'Amit Singh', 'EMP002', '+919876543221', 'Tech Park Gate B', 'morning', 'active', '2023-02-20', '+919876543231', 'Priya Singh'),
('guard-003', 'Suresh Reddy', 'EMP003', '+919876543222', 'Corporate Office Main', 'evening', 'active', '2023-03-10', '+919876543232', 'Kavitha Reddy'),
('guard-004', 'Vijay Sharma', 'EMP004', '+919876543223', 'Corporate Office Parking', 'evening', 'active', '2023-04-05', '+919876543233', 'Anita Sharma'),
('guard-005', 'Prakash Rao', 'EMP005', '+919876543224', 'Warehouse Zone 1', 'night', 'active', '2023-05-12', '+919876543234', 'Meena Rao'),
('guard-006', 'Manoj Verma', 'EMP006', '+919876543225', 'Warehouse Zone 2', 'night', 'on-leave', '2023-06-18', '+919876543235', 'Sunita Verma');

-- ============================================
-- SEED SHIFT TEMPLATES
-- ============================================
INSERT INTO shift_templates (id, name, start_time, end_time, break_duration, days_of_week, site_id, site_name, required_guards, is_active) VALUES
('template-001', 'Morning Shift - Tech Park A', '06:00:00', '14:00:00', 30, ARRAY[1,2,3,4,5,6], 'site-001', 'Tech Park Gate A', 2, true),
('template-002', 'Evening Shift - Corporate', '14:00:00', '22:00:00', 30, ARRAY[1,2,3,4,5,6], 'site-003', 'Corporate Office Main', 2, true),
('template-003', 'Night Shift - Warehouse', '22:00:00', '06:00:00', 45, ARRAY[0,1,2,3,4,5,6], 'site-005', 'Warehouse Zone 1', 2, true);

-- ============================================
-- SEED CHECKPOINTS
-- ============================================
INSERT INTO checkpoints (id, name, type, site_id, site_name, latitude, longitude, is_active, scan_frequency) VALUES
('checkpoint-001', 'Main Gate Entrance', 'qr', 'site-001', 'Tech Park Gate A', 12.8456, 77.6603, true, 60),
('checkpoint-002', 'Parking Lot North', 'nfc', 'site-001', 'Tech Park Gate A', 12.8457, 77.6604, true, 120),
('checkpoint-003', 'Reception Area', 'qr', 'site-003', 'Corporate Office Main', 12.9716, 77.5946, true, 60),
('checkpoint-004', 'Emergency Exit', 'beacon', 'site-005', 'Warehouse Zone 1', 12.9698, 77.7499, true, 90);

-- ============================================
-- SEED GEOFENCES
-- ============================================
INSERT INTO geofences (id, name, site_id, site_name, type, center_latitude, center_longitude, radius, is_active, alert_on_exit, alert_on_entry, assigned_guards) VALUES
('geofence-001', 'Tech Park Perimeter', 'site-001', 'Tech Park Gate A', 'circle', 12.8456, 77.6603, 500, true, true, false, ARRAY['guard-001', 'guard-002']),
('geofence-002', 'Corporate Office Area', 'site-003', 'Corporate Office Main', 'circle', 12.9716, 77.5946, 300, true, true, false, ARRAY['guard-003', 'guard-004']),
('geofence-003', 'Warehouse Restricted Zone', 'site-005', 'Warehouse Zone 1', 'circle', 12.9698, 77.7499, 200, true, true, true, ARRAY['guard-005']);

-- ============================================
-- SEED CHECKLISTS
-- ============================================
INSERT INTO checklists (id, name, site_id, site_name, type, is_active) VALUES
('checklist-001', 'Morning Patrol Checklist', 'site-001', 'Tech Park Gate A', 'patrol', true),
('checklist-002', 'Opening Procedures', 'site-003', 'Corporate Office Main', 'opening', true),
('checklist-003', 'Safety Inspection', 'site-005', 'Warehouse Zone 1', 'safety', true);

INSERT INTO checklist_items (id, checklist_id, description, is_required, "order") VALUES
('item-001', 'checklist-001', 'Check main gate lock and hinges', true, 1),
('item-002', 'checklist-001', 'Verify CCTV cameras are operational', true, 2),
('item-003', 'checklist-001', 'Inspect perimeter fencing', true, 3),
('item-004', 'checklist-001', 'Check emergency lighting', true, 4),
('item-005', 'checklist-002', 'Unlock main entrance', true, 1),
('item-006', 'checklist-002', 'Activate security systems', true, 2),
('item-007', 'checklist-002', 'Check fire extinguishers', true, 3),
('item-008', 'checklist-003', 'Verify emergency exits are clear', true, 1),
('item-009', 'checklist-003', 'Test fire alarm system', true, 2),
('item-010', 'checklist-003', 'Inspect first aid kit', true, 3);

-- ============================================
-- SEED TRAININGS
-- ============================================
INSERT INTO trainings (id, name, description, type, duration, validity_period, is_active) VALUES
('training-001', 'Basic Security Training', 'Introduction to security procedures and protocols', 'mandatory', 8.0, 12, true),
('training-002', 'Fire Safety and Emergency Response', 'Training on fire safety procedures and emergency evacuation', 'mandatory', 4.0, 12, true),
('training-003', 'First Aid Certification', 'Basic first aid and CPR training', 'certification', 16.0, 24, true),
('training-004', 'Advanced Surveillance Techniques', 'Advanced training on surveillance and monitoring', 'optional', 12.0, NULL, true);

-- ============================================
-- SEED CAMERAS
-- ============================================
INSERT INTO cameras (id, name, site_id, site_name, location, type, is_online, ai_enabled, last_seen) VALUES
('camera-001', 'Main Gate Camera 1', 'site-001', 'Tech Park Gate A', 'Main Entrance', 'outdoor', true, true, CURRENT_TIMESTAMP),
('camera-002', 'Parking Lot Camera 1', 'site-001', 'Tech Park Gate A', 'Parking Area', 'outdoor', true, false, CURRENT_TIMESTAMP),
('camera-003', 'Reception Camera', 'site-003', 'Corporate Office Main', 'Reception Area', 'indoor', true, true, CURRENT_TIMESTAMP),
('camera-004', 'Warehouse Entry', 'site-005', 'Warehouse Zone 1', 'Main Warehouse Door', 'outdoor', true, true, CURRENT_TIMESTAMP);

-- ============================================
-- SEED SAMPLE ATTENDANCE (Today)
-- ============================================
INSERT INTO attendance (guard_id, guard_name, date, check_in, check_out, status, site, shift, work_hours) VALUES
('guard-001', 'Rajesh Kumar', CURRENT_DATE, '06:00:00', '14:00:00', 'present', 'Tech Park Gate A', 'morning', 8.0),
('guard-002', 'Amit Singh', CURRENT_DATE, '06:05:00', NULL, 'late', 'Tech Park Gate B', 'morning', NULL),
('guard-003', 'Suresh Reddy', CURRENT_DATE, '14:00:00', NULL, 'present', 'Corporate Office Main', 'evening', NULL),
('guard-004', 'Vijay Sharma', CURRENT_DATE, '14:00:00', NULL, 'present', 'Corporate Office Parking', 'evening', NULL),
('guard-006', 'Manoj Verma', CURRENT_DATE, NULL, NULL, 'on-leave', 'Warehouse Zone 2', 'night', NULL);

-- ============================================
-- SEED SAMPLE INCIDENT
-- ============================================
INSERT INTO incident_logs (id, guard_id, guard_name, title, description, severity, timestamp, latitude, longitude, status, site) VALUES
('incident-001', 'guard-001', 'Rajesh Kumar', 'Suspicious Activity', 'Person loitering near parking area for extended period', 'medium', CURRENT_TIMESTAMP - INTERVAL '2 hours', 12.8457, 77.6604, 'reviewing', 'Tech Park Gate A');

-- ============================================
-- SEED SAMPLE NOTIFICATIONS
-- ============================================
INSERT INTO notifications (type, title, message, timestamp, is_read, priority, user_id) VALUES
('shift-confirmation', 'Shift Confirmed', 'Your shift for tomorrow has been confirmed', CURRENT_TIMESTAMP, false, 'medium', 'b2c3d4e5-f6a7-8901-bcde-f12345678901'),
('incident', 'New Incident Reported', 'Suspicious activity reported at Tech Park Gate A', CURRENT_TIMESTAMP - INTERVAL '1 hour', false, 'high', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
('system', 'System Maintenance', 'Scheduled maintenance tonight from 2 AM to 4 AM', CURRENT_TIMESTAMP - INTERVAL '3 hours', true, 'low', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
