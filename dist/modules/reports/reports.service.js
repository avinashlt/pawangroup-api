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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const report_schema_1 = require("../../schemas/report.schema");
const attendance_schema_1 = require("../../schemas/attendance.schema");
const incident_schema_1 = require("../../schemas/incident.schema");
const guard_schema_1 = require("../../schemas/guard.schema");
let ReportsService = class ReportsService {
    constructor(reportModel, configModel, attendanceModel, incidentModel, guardModel) {
        this.reportModel = reportModel;
        this.configModel = configModel;
        this.attendanceModel = attendanceModel;
        this.incidentModel = incidentModel;
        this.guardModel = guardModel;
    }
    async createReport(data) {
        const report = new this.reportModel({ ...data, generatedAt: new Date(), status: 'generating' });
        return report.save();
    }
    async findReports(type, siteId) {
        const query = {};
        if (type)
            query.type = type;
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        return this.reportModel.find(query).sort({ generatedAt: -1 });
    }
    async findReportById(id) {
        const report = await this.reportModel.findById(id);
        if (!report)
            throw new common_1.NotFoundException(`Report ${id} not found`);
        return report;
    }
    async deleteReport(id) {
        const result = await this.reportModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Report ${id} not found`);
    }
    async createConfig(data) {
        const config = new this.configModel(data);
        return config.save();
    }
    async findConfigs() { return this.configModel.find(); }
    async updateConfig(id, data) {
        const config = await this.configModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!config)
            throw new common_1.NotFoundException(`Config ${id} not found`);
        return config;
    }
    async deleteConfig(id) {
        const result = await this.configModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Config ${id} not found`);
    }
    async getGuardPerformance(guardId, startDate, endDate) {
        const guard = await this.guardModel.findById(guardId);
        if (!guard)
            throw new common_1.NotFoundException(`Guard ${guardId} not found`);
        const [attendance, incidents] = await Promise.all([
            this.attendanceModel.find({ guardId: new mongoose_2.Types.ObjectId(guardId), date: { $gte: startDate, $lte: endDate } }),
            this.incidentModel.find({ reportedBy: new mongoose_2.Types.ObjectId(guardId), timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
        ]);
        const totalShifts = attendance.length;
        const onTimeArrivals = attendance.filter(a => a.checkIn && a.status === 'present').length;
        return {
            guardId, guardName: guard.name, period: { startDate, endDate },
            metrics: { totalShifts, onTimeArrivals, onTimeRate: totalShifts ? (onTimeArrivals / totalShifts * 100).toFixed(1) : 0, incidentsReported: incidents.length },
        };
    }
    async getSitePerformance(siteId, startDate, endDate) {
        const [attendance, incidents] = await Promise.all([
            this.attendanceModel.find({ siteId: new mongoose_2.Types.ObjectId(siteId), date: { $gte: startDate, $lte: endDate } }),
            this.incidentModel.find({ siteId: new mongoose_2.Types.ObjectId(siteId), timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
        ]);
        return {
            siteId, period: { startDate, endDate },
            metrics: { totalAttendance: attendance.length, totalIncidents: incidents.length, incidentsByType: this.groupBy(incidents, 'type') },
        };
    }
    async getDashboardMetrics(startDate, endDate) {
        const [attendance, incidents, guards] = await Promise.all([
            this.attendanceModel.countDocuments({ date: { $gte: startDate, $lte: endDate } }),
            this.incidentModel.countDocuments({ timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
            this.guardModel.countDocuments({ status: 'active' }),
        ]);
        return { period: { startDate, endDate }, totalAttendance: attendance, totalIncidents: incidents, activeGuards: guards };
    }
    groupBy(arr, key) {
        return arr.reduce((acc, item) => { acc[item[key]] = (acc[item[key]] || 0) + 1; return acc; }, {});
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(report_schema_1.Report.name)),
    __param(1, (0, mongoose_1.InjectModel)(report_schema_1.ReportConfig.name)),
    __param(2, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __param(3, (0, mongoose_1.InjectModel)(incident_schema_1.Incident.name)),
    __param(4, (0, mongoose_1.InjectModel)(guard_schema_1.Guard.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReportsService);
//# sourceMappingURL=reports.service.js.map