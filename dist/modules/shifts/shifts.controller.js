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
exports.ShiftsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shifts_service_1 = require("./shifts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const shifts_dto_1 = require("./dto/shifts.dto");
let ShiftsController = class ShiftsController {
    constructor(service) {
        this.service = service;
    }
    async createShift(dto) { return this.service.createShift(dto); }
    async findShifts(guardId, siteId, date) {
        return this.service.findShifts(guardId, siteId, date);
    }
    async findShiftById(id) { return this.service.findShiftById(id); }
    async updateShift(id, dto) { return this.service.updateShift(id, dto); }
    async deleteShift(id) { await this.service.deleteShift(id); return { message: 'Shift deleted' }; }
    async createTemplate(dto) { return this.service.createTemplate(dto); }
    async findTemplates(siteId) { return this.service.findTemplates(siteId); }
    async updateTemplate(id, dto) { return this.service.updateTemplate(id, dto); }
    async deleteTemplate(id) { await this.service.deleteTemplate(id); return { message: 'Template deleted' }; }
    async createSwapRequest(dto) { return this.service.createSwapRequest(dto); }
    async findSwapRequests(guardId, status) { return this.service.findSwapRequests(guardId, status); }
    async updateSwapRequest(id, dto) { return this.service.updateSwapRequest(id, dto.status, dto.approvedBy); }
    async createTimeOffRequest(dto) { return this.service.createTimeOffRequest(dto); }
    async findTimeOffRequests(guardId, status) { return this.service.findTimeOffRequests(guardId, status); }
    async updateTimeOffRequest(id, dto) { return this.service.updateTimeOffRequest(id, dto.status, dto.approvedBy); }
};
exports.ShiftsController = ShiftsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create shift' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shifts_dto_1.CreateShiftDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "createShift", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get shifts' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('siteId')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "findShifts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shift by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "findShiftById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shift' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shifts_dto_1.UpdateShiftDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "updateShift", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete shift' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "deleteShift", null);
__decorate([
    (0, common_1.Post)('templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Create shift template' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shifts_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shift templates' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "findTemplates", null);
__decorate([
    (0, common_1.Put)('templates/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shift template' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shifts_dto_1.UpdateTemplateDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('templates/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete shift template' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)('swap-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Create shift swap request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shifts_dto_1.CreateSwapRequestDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "createSwapRequest", null);
__decorate([
    (0, common_1.Get)('swap-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shift swap requests' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "findSwapRequests", null);
__decorate([
    (0, common_1.Patch)('swap-requests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shift swap request status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shifts_dto_1.UpdateSwapRequestDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "updateSwapRequest", null);
__decorate([
    (0, common_1.Post)('time-off-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Create time-off request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shifts_dto_1.CreateTimeOffRequestDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "createTimeOffRequest", null);
__decorate([
    (0, common_1.Get)('time-off-requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get time-off requests' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "findTimeOffRequests", null);
__decorate([
    (0, common_1.Patch)('time-off-requests/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update time-off request status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shifts_dto_1.UpdateTimeOffRequestDto]),
    __metadata("design:returntype", Promise)
], ShiftsController.prototype, "updateTimeOffRequest", null);
exports.ShiftsController = ShiftsController = __decorate([
    (0, swagger_1.ApiTags)('shifts'),
    (0, common_1.Controller)('shifts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [shifts_service_1.ShiftsService])
], ShiftsController);
//# sourceMappingURL=shifts.controller.js.map