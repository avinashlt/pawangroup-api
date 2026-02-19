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
exports.GeofencesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const geofence_schema_1 = require("../../schemas/geofence.schema");
let GeofencesService = class GeofencesService {
    constructor(geofenceModel, alertModel) {
        this.geofenceModel = geofenceModel;
        this.alertModel = alertModel;
    }
    async create(data) {
        const geofence = new this.geofenceModel({
            ...data,
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            assignedGuards: data.assignedGuards?.map(id => new mongoose_2.Types.ObjectId(id)) || [],
        });
        return geofence.save();
    }
    async findAll(siteId) {
        const query = siteId ? { siteId: new mongoose_2.Types.ObjectId(siteId) } : {};
        return this.geofenceModel.find(query).sort({ siteName: 1, name: 1 });
    }
    async findById(id) {
        const geofence = await this.geofenceModel.findById(id);
        if (!geofence)
            throw new common_1.NotFoundException(`Geofence ${id} not found`);
        return geofence;
    }
    async update(id, data) {
        const geofence = await this.geofenceModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!geofence)
            throw new common_1.NotFoundException(`Geofence ${id} not found`);
        return geofence;
    }
    async delete(id) {
        const result = await this.geofenceModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Geofence ${id} not found`);
    }
    async createAlert(data) {
        const alert = new this.alertModel({
            ...data,
            geofenceId: new mongoose_2.Types.ObjectId(data.geofenceId),
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            timestamp: new Date(),
        });
        return alert.save();
    }
    async getAlerts(geofenceId, acknowledged) {
        const query = {};
        if (geofenceId)
            query.geofenceId = new mongoose_2.Types.ObjectId(geofenceId);
        if (acknowledged !== undefined)
            query.acknowledged = acknowledged;
        return this.alertModel.find(query).sort({ timestamp: -1 });
    }
    async acknowledgeAlert(id, acknowledgedBy) {
        const alert = await this.alertModel.findByIdAndUpdate(id, { acknowledged: true, acknowledgedBy, acknowledgedAt: new Date() }, { new: true });
        if (!alert)
            throw new common_1.NotFoundException(`Alert ${id} not found`);
        return alert;
    }
    async assignGuard(geofenceId, guardId) {
        const geofence = await this.geofenceModel.findByIdAndUpdate(geofenceId, { $addToSet: { assignedGuards: new mongoose_2.Types.ObjectId(guardId) } }, { new: true });
        if (!geofence)
            throw new common_1.NotFoundException(`Geofence ${geofenceId} not found`);
        return geofence;
    }
    async removeGuard(geofenceId, guardId) {
        const geofence = await this.geofenceModel.findByIdAndUpdate(geofenceId, { $pull: { assignedGuards: new mongoose_2.Types.ObjectId(guardId) } }, { new: true });
        if (!geofence)
            throw new common_1.NotFoundException(`Geofence ${geofenceId} not found`);
        return geofence;
    }
};
exports.GeofencesService = GeofencesService;
exports.GeofencesService = GeofencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(geofence_schema_1.Geofence.name)),
    __param(1, (0, mongoose_1.InjectModel)(geofence_schema_1.GeofenceAlert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GeofencesService);
//# sourceMappingURL=geofences.service.js.map