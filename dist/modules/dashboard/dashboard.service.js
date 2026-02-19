"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const guard_schema_1 = require("../../schemas/guard.schema");
const attendance_schema_1 = require("../../schemas/attendance.schema");
const incident_schema_1 = require("../../schemas/incident.schema");
const sos_alert_schema_1 = require("../../schemas/sos-alert.schema");
const monitoring_schema_1 = require("../../schemas/monitoring.schema");
let DashboardService = class DashboardService {
    constructor(guardModel, attendanceModel, incidentModel, sosAlertModel, sleepAlertModel, aiAlertModel) {
        this.guardModel = guardModel;
        this.attendanceModel = attendanceModel;
        this.incidentModel = incidentModel;
        this.sosAlertModel = sosAlertModel;
        this.sleepAlertModel = sleepAlertModel;
        this.aiAlertModel = aiAlertModel;
    }
    async getStats() {
        const today = new Date().toISOString().split('T')[0];
        const [totalGuards, activeGuards, onLeaveGuards, todayAttendance, activeIncidents, resolvedIncidents, activeSOSAlerts, activeSleepAlerts, activeAiAlerts,] = await Promise.all([
            this.guardModel.countDocuments(),
            this.guardModel.countDocuments({ status: 'active' }),
            this.guardModel.countDocuments({ status: 'on-leave' }),
            this.attendanceModel.find({ date: today }),
            this.incidentModel.countDocuments({ status: { $in: ['new', 'reviewing', 'escalated'] } }),
            this.incidentModel.countDocuments({ status: 'resolved' }),
            this.sosAlertModel.countDocuments({ status: { $in: ['active', 'responding'] } }),
            this.sleepAlertModel.countDocuments({ status: 'active' }),
            this.aiAlertModel.countDocuments({ status: { $in: ['new', 'reviewing'] } }),
        ]);
        const presentToday = todayAttendance.filter(a => a.status === 'present').length;
        const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
        const lateToday = todayAttendance.filter(a => a.status === 'late').length;
        const resolvedIncidentsData = await this.incidentModel.find({
            status: 'resolved',
            resolvedAt: { $exists: true },
        }).limit(100);
        let averageResponseTime = 0;
        if (resolvedIncidentsData.length > 0) {
            const totalResponseTime = resolvedIncidentsData.reduce((sum, incident) => {
                if (incident.resolvedAt && incident.timestamp) {
                    const responseTime = (new Date(incident.resolvedAt).getTime() - new Date(incident.timestamp).getTime()) / (1000 * 60);
                    return sum + responseTime;
                }
                return sum;
            }, 0);
            averageResponseTime = Math.round(totalResponseTime / resolvedIncidentsData.length);
        }
        return {
            totalGuards,
            activeGuards,
            presentToday,
            absentToday,
            lateToday,
            onLeave: onLeaveGuards,
            activeIncidents,
            resolvedIncidents,
            averageResponseTime,
            activeSOSAlerts,
            sleepAlerts: activeSleepAlerts,
            aiAlerts: activeAiAlerts,
        };
    }
    async getAttendanceTrend(days = 7) {
        const trend = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const attendance = await this.attendanceModel.find({ date: dateStr });
            trend.push({
                date: dateStr,
                present: attendance.filter(a => a.status === 'present').length,
                absent: attendance.filter(a => a.status === 'absent').length,
                late: attendance.filter(a => a.status === 'late').length,
            });
        }
        return trend;
    }
    async getIncidentTrend(days = 7) {
        const trend = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const startDate = new Date(today);
            startDate.setDate(startDate.getDate() - i);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(startDate);
            endDate.setHours(23, 59, 59, 999);
            const incidents = await this.incidentModel.find({
                timestamp: { $gte: startDate, $lte: endDate },
            });
            const bySeverity = {
                low: 0,
                medium: 0,
                high: 0,
                critical: 0,
            };
            incidents.forEach(incident => {
                bySeverity[incident.severity] = (bySeverity[incident.severity] || 0) + 1;
            });
            trend.push({
                date: startDate.toISOString().split('T')[0],
                count: incidents.length,
                bySeverity,
            });
        }
        return trend;
    }
    async getRecentAlerts(limit = 10) {
        const [sosAlerts, sleepAlerts, aiAlerts, incidents] = await Promise.all([
            this.sosAlertModel.find().sort({ timestamp: -1 }).limit(limit),
            this.sleepAlertModel.find().sort({ detectedAt: -1 }).limit(limit),
            this.aiAlertModel.find().sort({ detectedAt: -1 }).limit(limit),
            this.incidentModel.find().sort({ timestamp: -1 }).limit(limit),
        ]);
        return { sosAlerts, sleepAlerts, aiAlerts, incidents };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(guard_schema_1.Guard.name)),
    __param(1, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __param(2, (0, mongoose_1.InjectModel)(incident_schema_1.Incident.name)),
    __param(3, (0, mongoose_1.InjectModel)(sos_alert_schema_1.SosAlert.name)),
    __param(4, (0, mongoose_1.InjectModel)(monitoring_schema_1.SleepAlert.name)),
    __param(5, (0, mongoose_1.InjectModel)(monitoring_schema_1.AiAlert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map