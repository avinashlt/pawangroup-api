"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const guards_module_1 = require("./modules/guards/guards.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const incidents_module_1 = require("./modules/incidents/incidents.module");
const locations_module_1 = require("./modules/locations/locations.module");
const checkpoints_module_1 = require("./modules/checkpoints/checkpoints.module");
const geofences_module_1 = require("./modules/geofences/geofences.module");
const sos_alerts_module_1 = require("./modules/sos-alerts/sos-alerts.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const sites_module_1 = require("./modules/sites/sites.module");
const shifts_module_1 = require("./modules/shifts/shifts.module");
const reports_module_1 = require("./modules/reports/reports.module");
const compliance_module_1 = require("./modules/compliance/compliance.module");
const training_module_1 = require("./modules/training/training.module");
const monitoring_module_1 = require("./modules/monitoring/monitoring.module");
const cameras_module_1 = require("./modules/cameras/cameras.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawangroup_portal', {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
            }),
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            guards_module_1.GuardsModule,
            attendance_module_1.AttendanceModule,
            incidents_module_1.IncidentsModule,
            locations_module_1.LocationsModule,
            checkpoints_module_1.CheckpointsModule,
            geofences_module_1.GeofencesModule,
            sos_alerts_module_1.SosAlertsModule,
            notifications_module_1.NotificationsModule,
            sites_module_1.SitesModule,
            shifts_module_1.ShiftsModule,
            reports_module_1.ReportsModule,
            compliance_module_1.ComplianceModule,
            training_module_1.TrainingModule,
            monitoring_module_1.MonitoringModule,
            cameras_module_1.CamerasModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map