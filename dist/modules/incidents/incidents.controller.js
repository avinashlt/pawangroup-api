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
exports.IncidentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const incidents_service_1 = require("./incidents.service");
const incidents_dto_1 = require("./dto/incidents.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let IncidentsController = class IncidentsController {
    constructor(incidentsService) {
        this.incidentsService = incidentsService;
    }
    async create(createDto) {
        return this.incidentsService.create(createDto);
    }
    async findAll(filterDto) {
        return this.incidentsService.findAll(filterDto);
    }
    async getActiveIncidents() {
        return this.incidentsService.getActiveIncidents();
    }
    async getRecentIncidents(limit) {
        return this.incidentsService.getRecentIncidents(limit || 10);
    }
    async getStats() {
        return this.incidentsService.getStats();
    }
    async getIncidentsBySeverity(severity) {
        return this.incidentsService.getIncidentsBySeverity(severity);
    }
    async getIncidentsByGuard(guardId) {
        return this.incidentsService.getIncidentsByGuard(guardId);
    }
    async findOne(id) {
        return this.incidentsService.findOne(id);
    }
    async update(id, updateDto) {
        return this.incidentsService.update(id, updateDto);
    }
    async updateStatus(id, statusDto) {
        return this.incidentsService.updateStatus(id, statusDto.status, statusDto.resolvedBy, statusDto.notes);
    }
    async addMedia(id, mediaDto) {
        return this.incidentsService.addMedia(id, mediaDto);
    }
    async remove(id) {
        await this.incidentsService.remove(id);
        return { message: 'Incident deleted successfully' };
    }
};
exports.IncidentsController = IncidentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new incident' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Incident created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [incidents_dto_1.CreateIncidentDto]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all incidents with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of incidents' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'severity', required: false, enum: ['low', 'medium', 'high', 'critical'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['new', 'reviewing', 'resolved', 'escalated'] }),
    (0, swagger_1.ApiQuery)({ name: 'site', required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [incidents_dto_1.IncidentFilterDto]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active incidents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active incidents' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "getActiveIncidents", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent incidents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Recent incidents' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "getRecentIncidents", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incident statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incident statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('severity/:severity'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incidents by severity' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incidents by severity' }),
    __param(0, (0, common_1.Param)('severity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "getIncidentsBySeverity", null);
__decorate([
    (0, common_1.Get)('guard/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incidents by guard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incidents reported by guard' }),
    __param(0, (0, common_1.Param)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "getIncidentsByGuard", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get incident by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incident details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update incident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incident updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, incidents_dto_1.UpdateIncidentDto]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update incident status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, incidents_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(':id/media'),
    (0, swagger_1.ApiOperation)({ summary: 'Add media to incident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Media added' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, incidents_dto_1.AddMediaDto]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "addMedia", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete incident' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Incident deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncidentsController.prototype, "remove", null);
exports.IncidentsController = IncidentsController = __decorate([
    (0, swagger_1.ApiTags)('incidents'),
    (0, common_1.Controller)('incidents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [incidents_service_1.IncidentsService])
], IncidentsController);
//# sourceMappingURL=incidents.controller.js.map