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
exports.IncidentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const incident_schema_1 = require("../../schemas/incident.schema");
let IncidentsService = class IncidentsService {
    constructor(incidentModel) {
        this.incidentModel = incidentModel;
    }
    async create(createDto) {
        const incident = new this.incidentModel({
            ...createDto,
            guardId: new mongoose_2.Types.ObjectId(createDto.guardId),
            timestamp: createDto.timestamp ? new Date(createDto.timestamp) : new Date(),
        });
        return incident.save();
    }
    async findAll(filterDto) {
        const query = {};
        if (filterDto) {
            if (filterDto.startDate && filterDto.endDate) {
                query.timestamp = {
                    $gte: new Date(filterDto.startDate),
                    $lte: new Date(filterDto.endDate),
                };
            }
            else if (filterDto.startDate) {
                query.timestamp = { $gte: new Date(filterDto.startDate) };
            }
            else if (filterDto.endDate) {
                query.timestamp = { $lte: new Date(filterDto.endDate) };
            }
            if (filterDto.guardId)
                query.guardId = new mongoose_2.Types.ObjectId(filterDto.guardId);
            if (filterDto.severity)
                query.severity = filterDto.severity;
            if (filterDto.status)
                query.status = filterDto.status;
            if (filterDto.site)
                query.site = { $regex: filterDto.site, $options: 'i' };
        }
        return this.incidentModel.find(query).sort({ timestamp: -1 });
    }
    async findOne(id) {
        const incident = await this.incidentModel.findById(id);
        if (!incident) {
            throw new common_1.NotFoundException(`Incident with ID ${id} not found`);
        }
        return incident;
    }
    async update(id, updateDto) {
        const incident = await this.incidentModel.findByIdAndUpdate(id, { $set: updateDto }, { new: true });
        if (!incident) {
            throw new common_1.NotFoundException(`Incident with ID ${id} not found`);
        }
        return incident;
    }
    async updateStatus(id, status, resolvedBy, notes) {
        const updateData = { status };
        if (status === 'resolved') {
            updateData.resolvedAt = new Date();
            if (resolvedBy)
                updateData.resolvedBy = resolvedBy;
        }
        if (notes)
            updateData.notes = notes;
        const incident = await this.incidentModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!incident) {
            throw new common_1.NotFoundException(`Incident with ID ${id} not found`);
        }
        return incident;
    }
    async addMedia(id, media) {
        const incident = await this.incidentModel.findByIdAndUpdate(id, { $push: { media: { ...media, uploadedAt: new Date() } } }, { new: true });
        if (!incident) {
            throw new common_1.NotFoundException(`Incident with ID ${id} not found`);
        }
        return incident;
    }
    async remove(id) {
        const result = await this.incidentModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Incident with ID ${id} not found`);
        }
    }
    async getActiveIncidents() {
        return this.incidentModel.find({
            status: { $in: ['new', 'reviewing', 'escalated'] },
        }).sort({ timestamp: -1 });
    }
    async getRecentIncidents(limit = 10) {
        return this.incidentModel.find().sort({ timestamp: -1 }).limit(limit);
    }
    async getIncidentsBySeverity(severity) {
        return this.incidentModel.find({ severity }).sort({ timestamp: -1 });
    }
    async getIncidentsByGuard(guardId) {
        return this.incidentModel.find({
            guardId: new mongoose_2.Types.ObjectId(guardId),
        }).sort({ timestamp: -1 });
    }
    async getStatistics() {
        const [total, statusStats, severityStats] = await Promise.all([
            this.incidentModel.countDocuments(),
            this.incidentModel.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            this.incidentModel.aggregate([
                { $group: { _id: '$severity', count: { $sum: 1 } } },
            ]),
        ]);
        const byStatus = {};
        statusStats.forEach(s => { byStatus[s._id] = s.count; });
        const bySeverity = {};
        severityStats.forEach(s => { bySeverity[s._id] = s.count; });
        return { total, byStatus, bySeverity };
    }
    async getStats() {
        return this.getStatistics();
    }
};
exports.IncidentsService = IncidentsService;
exports.IncidentsService = IncidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(incident_schema_1.Incident.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IncidentsService);
//# sourceMappingURL=incidents.service.js.map