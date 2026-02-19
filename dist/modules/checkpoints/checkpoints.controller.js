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
exports.CheckpointsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const checkpoints_service_1 = require("./checkpoints.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const checkpoints_dto_1 = require("./dto/checkpoints.dto");
let CheckpointsController = class CheckpointsController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.createCheckpoint(dto);
    }
    async findAll(siteId) {
        return this.service.findAllCheckpoints(siteId);
    }
    async getMissed(siteId) {
        return this.service.getMissedScans(siteId);
    }
    async getScans(checkpointId, guardId, limit) {
        return this.service.getScans(checkpointId, guardId, limit || 50);
    }
    async recordScan(dto) {
        return this.service.recordScan(dto);
    }
    async findOne(id) {
        return this.service.findCheckpointById(id);
    }
    async update(id, dto) {
        return this.service.updateCheckpoint(id, dto);
    }
    async remove(id) {
        await this.service.deleteCheckpoint(id);
        return { message: 'Checkpoint deleted' };
    }
};
exports.CheckpointsController = CheckpointsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create checkpoint' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkpoints_dto_1.CreateCheckpointDto]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all checkpoints' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('missed'),
    (0, swagger_1.ApiOperation)({ summary: 'Get missed checkpoints' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "getMissed", null);
__decorate([
    (0, common_1.Get)('scans'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checkpoint scans' }),
    (0, swagger_1.ApiQuery)({ name: 'checkpointId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('checkpointId')),
    __param(1, (0, common_1.Query)('guardId')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "getScans", null);
__decorate([
    (0, common_1.Post)('scan'),
    (0, swagger_1.ApiOperation)({ summary: 'Record checkpoint scan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkpoints_dto_1.RecordScanDto]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "recordScan", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checkpoint by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update checkpoint' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, checkpoints_dto_1.UpdateCheckpointDto]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete checkpoint' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CheckpointsController.prototype, "remove", null);
exports.CheckpointsController = CheckpointsController = __decorate([
    (0, swagger_1.ApiTags)('checkpoints'),
    (0, common_1.Controller)('checkpoints'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [checkpoints_service_1.CheckpointsService])
], CheckpointsController);
//# sourceMappingURL=checkpoints.controller.js.map