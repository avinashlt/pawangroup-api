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
exports.SosAlertsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sos_alerts_service_1 = require("./sos-alerts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const sos_alerts_dto_1 = require("./dto/sos-alerts.dto");
let SosAlertsController = class SosAlertsController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) { return this.service.create(dto); }
    async findAll(status, siteId) { return this.service.findAll(status, siteId); }
    async getActive() { return this.service.getActiveAlerts(); }
    async getStats() { return this.service.getStats(); }
    async findById(id) { return this.service.findById(id); }
    async respond(id, dto) { return this.service.respond(id, dto.respondedBy); }
    async resolve(id, dto) { return this.service.resolve(id, dto.resolvedBy, dto.resolutionNotes); }
};
exports.SosAlertsController = SosAlertsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create SOS alert' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sos_alerts_dto_1.CreateSosAlertDto]),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all SOS alerts' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active SOS alerts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "getActive", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SOS alert statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get SOS alert by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id/respond'),
    (0, swagger_1.ApiOperation)({ summary: 'Respond to SOS alert' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sos_alerts_dto_1.RespondDto]),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "respond", null);
__decorate([
    (0, common_1.Patch)(':id/resolve'),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve SOS alert' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sos_alerts_dto_1.ResolveDto]),
    __metadata("design:returntype", Promise)
], SosAlertsController.prototype, "resolve", null);
exports.SosAlertsController = SosAlertsController = __decorate([
    (0, swagger_1.ApiTags)('sos-alerts'),
    (0, common_1.Controller)('sos-alerts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [sos_alerts_service_1.SosAlertsService])
], SosAlertsController);
//# sourceMappingURL=sos-alerts.controller.js.map