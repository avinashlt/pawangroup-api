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
exports.SosAlertsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sos_alert_schema_1 = require("../../schemas/sos-alert.schema");
let SosAlertsService = class SosAlertsService {
    constructor(sosAlertModel) {
        this.sosAlertModel = sosAlertModel;
    }
    async create(data) {
        const alert = new this.sosAlertModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            timestamp: new Date(),
            status: 'active',
        });
        return alert.save();
    }
    async findAll(status, siteId) {
        const query = {};
        if (status)
            query.status = status;
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        return this.sosAlertModel.find(query).sort({ timestamp: -1 });
    }
    async findById(id) {
        const alert = await this.sosAlertModel.findById(id);
        if (!alert)
            throw new common_1.NotFoundException(`SOS Alert ${id} not found`);
        return alert;
    }
    async respond(id, respondedBy) {
        const alert = await this.sosAlertModel.findByIdAndUpdate(id, { status: 'responding', respondedBy, respondedAt: new Date() }, { new: true });
        if (!alert)
            throw new common_1.NotFoundException(`SOS Alert ${id} not found`);
        return alert;
    }
    async resolve(id, resolvedBy, resolutionNotes) {
        const alert = await this.sosAlertModel.findByIdAndUpdate(id, { status: 'resolved', resolvedBy, resolvedAt: new Date(), resolutionNotes }, { new: true });
        if (!alert)
            throw new common_1.NotFoundException(`SOS Alert ${id} not found`);
        return alert;
    }
    async getActiveAlerts() {
        return this.sosAlertModel.find({ status: { $in: ['active', 'responding'] } }).sort({ timestamp: -1 });
    }
    async getStats() {
        const [stats, avgResponse] = await Promise.all([
            this.sosAlertModel.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            this.sosAlertModel.aggregate([
                { $match: { respondedAt: { $exists: true } } },
                { $project: { responseTime: { $subtract: ['$respondedAt', '$timestamp'] } } },
                { $group: { _id: null, avg: { $avg: '$responseTime' } } },
            ]),
        ]);
        const counts = { active: 0, responding: 0, resolved: 0 };
        stats.forEach(s => { if (counts.hasOwnProperty(s._id))
            counts[s._id] = s.count; });
        return { total: counts.active + counts.responding + counts.resolved, ...counts, avgResponseTime: avgResponse[0]?.avg || 0 };
    }
};
exports.SosAlertsService = SosAlertsService;
exports.SosAlertsService = SosAlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sos_alert_schema_1.SosAlert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SosAlertsService);
//# sourceMappingURL=sos-alerts.service.js.map