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
exports.CamerasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cameras_service_1 = require("./cameras.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cameras_dto_1 = require("./dto/cameras.dto");
let CamerasController = class CamerasController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) { return this.service.create(dto); }
    async findAll(siteId, status, type) {
        return this.service.findAll(siteId, status, type);
    }
    async getOnlineCameras() { return this.service.getOnlineCameras(); }
    async getOfflineCameras() { return this.service.getOfflineCameras(); }
    async getCameraStats() { return this.service.getCameraStats(); }
    async getCamerasBySite(siteId) { return this.service.getCamerasBySite(siteId); }
    async findById(id) { return this.service.findById(id); }
    async update(id, dto) { return this.service.update(id, dto); }
    async updateStatus(id, dto) { return this.service.updateStatus(id, dto.status); }
    async toggleRecording(id) { return this.service.toggleRecording(id); }
    async bulkUpdateStatus(dto) { return this.service.bulkUpdateStatus(dto.cameraIds, dto.status); }
    async delete(id) { await this.service.delete(id); return { message: 'Camera deleted' }; }
};
exports.CamerasController = CamerasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create camera' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cameras_dto_1.CreateCameraDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cameras' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('online'),
    (0, swagger_1.ApiOperation)({ summary: 'Get online cameras' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "getOnlineCameras", null);
__decorate([
    (0, common_1.Get)('offline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get offline cameras' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "getOfflineCameras", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get camera statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "getCameraStats", null);
__decorate([
    (0, common_1.Get)('site/:siteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cameras by site' }),
    __param(0, (0, common_1.Param)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "getCamerasBySite", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get camera by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update camera' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cameras_dto_1.UpdateCameraDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update camera status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cameras_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/toggle-recording'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle camera recording' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "toggleRecording", null);
__decorate([
    (0, common_1.Patch)('bulk-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update camera status' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cameras_dto_1.BulkUpdateStatusDto]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "bulkUpdateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete camera' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamerasController.prototype, "delete", null);
exports.CamerasController = CamerasController = __decorate([
    (0, swagger_1.ApiTags)('cameras'),
    (0, common_1.Controller)('cameras'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [cameras_service_1.CamerasService])
], CamerasController);
//# sourceMappingURL=cameras.controller.js.map