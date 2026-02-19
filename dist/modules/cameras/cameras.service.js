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
exports.CamerasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const camera_schema_1 = require("../../schemas/camera.schema");
let CamerasService = class CamerasService {
    constructor(cameraModel) {
        this.cameraModel = cameraModel;
    }
    async create(data) {
        const camera = new this.cameraModel({
            ...data,
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
        });
        return camera.save();
    }
    async findAll(siteId, status, type) {
        const query = {};
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (status)
            query.status = status;
        if (type)
            query.type = type;
        return this.cameraModel.find(query).sort({ siteName: 1, name: 1 });
    }
    async findById(id) {
        const camera = await this.cameraModel.findById(id);
        if (!camera)
            throw new common_1.NotFoundException(`Camera ${id} not found`);
        return camera;
    }
    async update(id, data) {
        const camera = await this.cameraModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!camera)
            throw new common_1.NotFoundException(`Camera ${id} not found`);
        return camera;
    }
    async delete(id) {
        const result = await this.cameraModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Camera ${id} not found`);
    }
    async updateStatus(id, status) {
        const camera = await this.cameraModel.findByIdAndUpdate(id, { status, lastOnline: status === 'online' ? new Date() : undefined }, { new: true });
        if (!camera)
            throw new common_1.NotFoundException(`Camera ${id} not found`);
        return camera;
    }
    async toggleRecording(id) {
        const camera = await this.cameraModel.findById(id);
        if (!camera)
            throw new common_1.NotFoundException(`Camera ${id} not found`);
        camera.isRecording = !camera.isRecording;
        return camera.save();
    }
    async getOnlineCameras() {
        return this.cameraModel.find({ status: 'online' }).sort({ siteName: 1, name: 1 });
    }
    async getOfflineCameras() {
        return this.cameraModel.find({ status: { $ne: 'online' } }).sort({ siteName: 1, name: 1 });
    }
    async getCamerasBySite(siteId) {
        return this.cameraModel.find({ siteId: new mongoose_2.Types.ObjectId(siteId) }).sort({ name: 1 });
    }
    async getCameraStats() {
        const [statusStats, typeStats] = await Promise.all([
            this.cameraModel.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
            this.cameraModel.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
        ]);
        return {
            total: statusStats.reduce((a, b) => a + b.count, 0),
            byStatus: statusStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}),
            byType: typeStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}),
        };
    }
    async bulkUpdateStatus(cameraIds, status) {
        const result = await this.cameraModel.updateMany({ _id: { $in: cameraIds.map(id => new mongoose_2.Types.ObjectId(id)) } }, { status, lastOnline: status === 'online' ? new Date() : undefined });
        return { updated: result.modifiedCount };
    }
};
exports.CamerasService = CamerasService;
exports.CamerasService = CamerasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(camera_schema_1.Camera.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CamerasService);
//# sourceMappingURL=cameras.service.js.map