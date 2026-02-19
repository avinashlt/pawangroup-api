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
exports.CheckpointsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const checkpoint_schema_1 = require("../../schemas/checkpoint.schema");
let CheckpointsService = class CheckpointsService {
    constructor(checkpointModel, scanModel) {
        this.checkpointModel = checkpointModel;
        this.scanModel = scanModel;
    }
    async createCheckpoint(data) {
        const checkpoint = new this.checkpointModel({
            ...data,
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
        });
        return checkpoint.save();
    }
    async findAllCheckpoints(siteId) {
        const query = siteId ? { siteId: new mongoose_2.Types.ObjectId(siteId) } : {};
        return this.checkpointModel.find(query).sort({ siteName: 1, name: 1 });
    }
    async findCheckpointById(id) {
        const checkpoint = await this.checkpointModel.findById(id);
        if (!checkpoint)
            throw new common_1.NotFoundException(`Checkpoint ${id} not found`);
        return checkpoint;
    }
    async updateCheckpoint(id, data) {
        const checkpoint = await this.checkpointModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!checkpoint)
            throw new common_1.NotFoundException(`Checkpoint ${id} not found`);
        return checkpoint;
    }
    async deleteCheckpoint(id) {
        const result = await this.checkpointModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Checkpoint ${id} not found`);
    }
    async recordScan(data) {
        const checkpoint = await this.checkpointModel.findById(data.checkpointId);
        if (!checkpoint)
            throw new common_1.NotFoundException(`Checkpoint ${data.checkpointId} not found`);
        const lastScan = checkpoint.lastScanned;
        const now = new Date();
        let status = 'on-time';
        if (lastScan) {
            const diff = (now.getTime() - new Date(lastScan).getTime()) / (1000 * 60);
            if (diff > checkpoint.scanFrequency * 1.1)
                status = 'late';
        }
        const scan = new this.scanModel({
            checkpointId: new mongoose_2.Types.ObjectId(data.checkpointId),
            checkpointName: data.checkpointName,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            guardName: data.guardName,
            scannedAt: now,
            location: data.location,
            status,
            notes: data.notes,
        });
        checkpoint.lastScanned = now;
        await checkpoint.save();
        return scan.save();
    }
    async getScans(checkpointId, guardId, limit = 50) {
        const query = {};
        if (checkpointId)
            query.checkpointId = new mongoose_2.Types.ObjectId(checkpointId);
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        return this.scanModel.find(query).sort({ scannedAt: -1 }).limit(limit);
    }
    async getMissedScans(siteId) {
        const now = new Date();
        const query = { isActive: true };
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        const checkpoints = await this.checkpointModel.find(query);
        return checkpoints.filter(cp => {
            if (!cp.lastScanned)
                return true;
            const diff = (now.getTime() - new Date(cp.lastScanned).getTime()) / (1000 * 60);
            return diff > cp.scanFrequency;
        });
    }
};
exports.CheckpointsService = CheckpointsService;
exports.CheckpointsService = CheckpointsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(checkpoint_schema_1.Checkpoint.name)),
    __param(1, (0, mongoose_1.InjectModel)(checkpoint_schema_1.CheckpointScan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CheckpointsService);
//# sourceMappingURL=checkpoints.service.js.map