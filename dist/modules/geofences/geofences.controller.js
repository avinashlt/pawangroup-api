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
exports.GeofencesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const geofences_service_1 = require("./geofences.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const geofences_dto_1 = require("./dto/geofences.dto");
let GeofencesController = class GeofencesController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) { return this.service.create(dto); }
    async findAll(siteId) { return this.service.findAll(siteId); }
    async getAlerts(geofenceId, acknowledged) {
        return this.service.getAlerts(geofenceId, acknowledged);
    }
    async createAlert(dto) { return this.service.createAlert(dto); }
    async acknowledgeAlert(id, dto) {
        return this.service.acknowledgeAlert(id, dto.acknowledgedBy);
    }
    async findById(id) { return this.service.findById(id); }
    async update(id, dto) { return this.service.update(id, dto); }
    async assignGuard(id, guardId) { return this.service.assignGuard(id, guardId); }
    async removeGuard(id, guardId) { return this.service.removeGuard(id, guardId); }
    async delete(id) { await this.service.delete(id); return { message: 'Geofence deleted' }; }
};
exports.GeofencesController = GeofencesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create geofence' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [geofences_dto_1.CreateGeofenceDto]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all geofences' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get geofence alerts' }),
    (0, swagger_1.ApiQuery)({ name: 'geofenceId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'acknowledged', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('geofenceId')),
    __param(1, (0, common_1.Query)('acknowledged')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Post)('alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create geofence alert' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [geofences_dto_1.CreateAlertDto]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "createAlert", null);
__decorate([
    (0, common_1.Patch)('alerts/:id/acknowledge'),
    (0, swagger_1.ApiOperation)({ summary: 'Acknowledge alert' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, geofences_dto_1.AcknowledgeAlertDto]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "acknowledgeAlert", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get geofence by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update geofence' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, geofences_dto_1.UpdateGeofenceDto]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/assign/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign guard to geofence' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "assignGuard", null);
__decorate([
    (0, common_1.Patch)(':id/unassign/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove guard from geofence' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "removeGuard", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete geofence' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeofencesController.prototype, "delete", null);
exports.GeofencesController = GeofencesController = __decorate([
    (0, swagger_1.ApiTags)('geofences'),
    (0, common_1.Controller)('geofences'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [geofences_service_1.GeofencesService])
], GeofencesController);
//# sourceMappingURL=geofences.controller.js.map