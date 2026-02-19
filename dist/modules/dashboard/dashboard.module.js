"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const guard_schema_1 = require("../../schemas/guard.schema");
const attendance_schema_1 = require("../../schemas/attendance.schema");
const incident_schema_1 = require("../../schemas/incident.schema");
const sos_alert_schema_1 = require("../../schemas/sos-alert.schema");
const monitoring_schema_1 = require("../../schemas/monitoring.schema");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: guard_schema_1.Guard.name, schema: guard_schema_1.GuardSchema },
                { name: attendance_schema_1.Attendance.name, schema: attendance_schema_1.AttendanceSchema },
                { name: incident_schema_1.Incident.name, schema: incident_schema_1.IncidentSchema },
                { name: sos_alert_schema_1.SosAlert.name, schema: sos_alert_schema_1.SosAlertSchema },
                { name: monitoring_schema_1.SleepAlert.name, schema: monitoring_schema_1.SleepAlertSchema },
                { name: monitoring_schema_1.AiAlert.name, schema: monitoring_schema_1.AiAlertSchema },
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
        exports: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map