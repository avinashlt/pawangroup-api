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
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const monitoring_schema_1 = require("../../schemas/monitoring.schema");
let MonitoringService = class MonitoringService {
    constructor(monitoringModel, sleepAlertModel, aiAlertModel) {
        this.monitoringModel = monitoringModel;
        this.sleepAlertModel = sleepAlertModel;
        this.aiAlertModel = aiAlertModel;
    }
    async createSession(data) {
        const session = new this.monitoringModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            startTime: new Date(),
            status: 'active',
        });
        return session.save();
    }
    async findSessions(guardId, siteId, status) {
        const query = {};
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (status)
            query.status = status;
        return this.monitoringModel.find(query).sort({ startTime: -1 });
    }
    async getActiveSessions() {
        return this.monitoringModel.find({ status: 'active' }).sort({ startTime: -1 });
    }
    async endSession(id) {
        const session = await this.monitoringModel.findByIdAndUpdate(id, { status: 'ended', endTime: new Date() }, { new: true });
        if (!session)
            throw new common_1.NotFoundException(`Session ${id} not found`);
        return session;
    }
    async updateHeartbeat(id) {
        const session = await this.monitoringModel.findByIdAndUpdate(id, { lastHeartbeat: new Date() }, { new: true });
        if (!session)
            throw new common_1.NotFoundException(`Session ${id} not found`);
        return session;
    }
    async createSleepAlert(data) {
        const alert = new this.sleepAlertModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            cameraId: data.cameraId ? new mongoose_2.Types.ObjectId(data.cameraId) : undefined,
            timestamp: new Date(),
            acknowledged: false,
        });
        return alert.save();
    }
    async findSleepAlerts(guardId, siteId, acknowledged) {
        const query = {};
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (acknowledged !== undefined)
            query.acknowledged = acknowledged;
        return this.sleepAlertModel.find(query).sort({ timestamp: -1 });
    }
    async acknowledgeSleepAlert(id, acknowledgedBy) {
        const alert = await this.sleepAlertModel.findByIdAndUpdate(id, { acknowledged: true, acknowledgedBy, acknowledgedAt: new Date() }, { new: true });
        if (!alert)
            throw new common_1.NotFoundException(`Sleep alert ${id} not found`);
        return alert;
    }
    async createAIAlert(data) {
        const alert = new this.aiAlertModel({
            ...data,
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            cameraId: data.cameraId ? new mongoose_2.Types.ObjectId(data.cameraId) : undefined,
            timestamp: new Date(),
            status: 'new',
        });
        return alert.save();
    }
    async findAIAlerts(siteId, type, status) {
        const query = {};
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (type)
            query.type = type;
        if (status)
            query.status = status;
        return this.aiAlertModel.find(query).sort({ timestamp: -1 });
    }
    async updateAIAlertStatus(id, status, reviewedBy, notes) {
        const update = { status, reviewedAt: new Date() };
        if (reviewedBy)
            update.reviewedBy = reviewedBy;
        if (notes)
            update.reviewNotes = notes;
        const alert = await this.aiAlertModel.findByIdAndUpdate(id, update, { new: true });
        if (!alert)
            throw new common_1.NotFoundException(`AI alert ${id} not found`);
        return alert;
    }
    async getMonitoringMetrics(siteId, startDate, endDate) {
        const matchStage = {};
        if (siteId)
            matchStage.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (startDate && endDate)
            matchStage.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        const [sleepStats, aiStats] = await Promise.all([
            this.sleepAlertModel.aggregate([{ $match: matchStage }, { $group: { _id: '$acknowledged', count: { $sum: 1 } } }]),
            this.aiAlertModel.aggregate([{ $match: matchStage }, { $group: { _id: '$type', count: { $sum: 1 } } }]),
        ]);
        return {
            sleepAlerts: { total: sleepStats.reduce((a, b) => a + b.count, 0), acknowledged: sleepStats.find(s => s._id === true)?.count || 0 },
            aiAlerts: { total: aiStats.reduce((a, b) => a + b.count, 0), byType: aiStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}) },
        };
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(monitoring_schema_1.Monitoring.name)),
    __param(1, (0, mongoose_1.InjectModel)(monitoring_schema_1.SleepAlert.name)),
    __param(2, (0, mongoose_1.InjectModel)(monitoring_schema_1.AiAlert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map