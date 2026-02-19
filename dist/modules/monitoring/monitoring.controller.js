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
exports.MonitoringController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const monitoring_service_1 = require("./monitoring.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const monitoring_dto_1 = require("./dto/monitoring.dto");
let MonitoringController = class MonitoringController {
    constructor(service) {
        this.service = service;
    }
    async createSession(dto) { return this.service.createSession(dto); }
    async findSessions(guardId, siteId, status) {
        return this.service.findSessions(guardId, siteId, status);
    }
    async getActiveSessions() { return this.service.getActiveSessions(); }
    async endSession(id) { return this.service.endSession(id); }
    async updateHeartbeat(id) { return this.service.updateHeartbeat(id); }
    async createSleepAlert(dto) { return this.service.createSleepAlert(dto); }
    async findSleepAlerts(guardId, siteId, acknowledged) {
        return this.service.findSleepAlerts(guardId, siteId, acknowledged);
    }
    async acknowledgeSleepAlert(id, dto) {
        return this.service.acknowledgeSleepAlert(id, dto.acknowledgedBy);
    }
    async createAIAlert(dto) { return this.service.createAIAlert(dto); }
    async findAIAlerts(siteId, type, status) {
        return this.service.findAIAlerts(siteId, type, status);
    }
    async updateAIAlertStatus(id, dto) {
        return this.service.updateAIAlertStatus(id, dto.status, dto.reviewedBy, dto.reviewNotes);
    }
    async getMonitoringMetrics(siteId, startDate, endDate) {
        return this.service.getMonitoringMetrics(siteId, startDate, endDate);
    }
};
exports.MonitoringController = MonitoringController;
__decorate([
    (0, common_1.Post)('sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create monitoring session' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [monitoring_dto_1.CreateSessionDto]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "createSession", null);
__decorate([
    (0, common_1.Get)('sessions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monitoring sessions' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('siteId')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "findSessions", null);
__decorate([
    (0, common_1.Get)('sessions/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active monitoring sessions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Patch)('sessions/:id/end'),
    (0, swagger_1.ApiOperation)({ summary: 'End monitoring session' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "endSession", null);
__decorate([
    (0, common_1.Patch)('sessions/:id/heartbeat'),
    (0, swagger_1.ApiOperation)({ summary: 'Update session heartbeat' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "updateHeartbeat", null);
__decorate([
    (0, common_1.Post)('sleep-alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create sleep alert' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [monitoring_dto_1.CreateSleepAlertDto]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "createSleepAlert", null);
__decorate([
    (0, common_1.Get)('sleep-alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sleep alerts' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'acknowledged', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('siteId')),
    __param(2, (0, common_1.Query)('acknowledged')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "findSleepAlerts", null);
__decorate([
    (0, common_1.Patch)('sleep-alerts/:id/acknowledge'),
    (0, swagger_1.ApiOperation)({ summary: 'Acknowledge sleep alert' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, monitoring_dto_1.AcknowledgeAlertDto]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "acknowledgeSleepAlert", null);
__decorate([
    (0, common_1.Post)('ai-alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create AI alert' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [monitoring_dto_1.CreateAIAlertDto]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "createAIAlert", null);
__decorate([
    (0, common_1.Get)('ai-alerts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get AI alerts' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "findAIAlerts", null);
__decorate([
    (0, common_1.Patch)('ai-alerts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update AI alert status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, monitoring_dto_1.UpdateAIAlertDto]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "updateAIAlertStatus", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monitoring metrics' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MonitoringController.prototype, "getMonitoringMetrics", null);
exports.MonitoringController = MonitoringController = __decorate([
    (0, swagger_1.ApiTags)('monitoring'),
    (0, common_1.Controller)('monitoring'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [monitoring_service_1.MonitoringService])
], MonitoringController);
//# sourceMappingURL=monitoring.controller.js.map