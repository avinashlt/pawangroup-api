"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./auth/auth.module"), exports);
__exportStar(require("./guards/guards.module"), exports);
__exportStar(require("./dashboard/dashboard.module"), exports);
__exportStar(require("./attendance/attendance.module"), exports);
__exportStar(require("./incidents/incidents.module"), exports);
__exportStar(require("./locations/locations.module"), exports);
__exportStar(require("./sites/sites.module"), exports);
__exportStar(require("./checkpoints/checkpoints.module"), exports);
__exportStar(require("./geofences/geofences.module"), exports);
__exportStar(require("./sos-alerts/sos-alerts.module"), exports);
__exportStar(require("./notifications/notifications.module"), exports);
__exportStar(require("./shifts/shifts.module"), exports);
__exportStar(require("./reports/reports.module"), exports);
__exportStar(require("./compliance/compliance.module"), exports);
__exportStar(require("./training/training.module"), exports);
__exportStar(require("./monitoring/monitoring.module"), exports);
__exportStar(require("./cameras/cameras.module"), exports);
//# sourceMappingURL=index.js.map