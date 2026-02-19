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
exports.GuardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_service_1 = require("./guards.service");
const guards_dto_1 = require("./dto/guards.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let GuardsController = class GuardsController {
    constructor(guardsService) {
        this.guardsService = guardsService;
    }
    async create(createGuardDto) {
        return this.guardsService.create(createGuardDto);
    }
    async findAll(filterDto) {
        return this.guardsService.findAll(filterDto);
    }
    async getActiveGuards() {
        return this.guardsService.getActiveGuards();
    }
    async getGuardsBySite(site) {
        return this.guardsService.getGuardsBySite(site);
    }
    async getGuardsByShift(shift) {
        return this.guardsService.getGuardsByShift(shift);
    }
    async getCount() {
        const count = await this.guardsService.getCount();
        return { count };
    }
    async getCountByStatus() {
        return this.guardsService.getCountByStatus();
    }
    async findOne(id) {
        return this.guardsService.findOne(id);
    }
    async findByEmployeeId(employeeId) {
        return this.guardsService.findByEmployeeId(employeeId);
    }
    async update(id, updateGuardDto) {
        return this.guardsService.update(id, updateGuardDto);
    }
    async updateStatus(id, status) {
        return this.guardsService.updateStatus(id, status);
    }
    async remove(id) {
        await this.guardsService.remove(id);
        return { message: 'Guard deleted successfully' };
    }
};
exports.GuardsController = GuardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new guard' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Guard created successfully', type: guards_dto_1.GuardResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guards_dto_1.CreateGuardDto]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guards with optional filtering' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of guards', type: [guards_dto_1.GuardResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['active', 'inactive', 'on-leave'] }),
    (0, swagger_1.ApiQuery)({ name: 'shift', required: false, enum: ['morning', 'evening', 'night'] }),
    (0, swagger_1.ApiQuery)({ name: 'assignedSite', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guards_dto_1.GuardFilterDto]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active guards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active guards', type: [guards_dto_1.GuardResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getActiveGuards", null);
__decorate([
    (0, common_1.Get)('by-site/:site'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guards by site' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of guards at site', type: [guards_dto_1.GuardResponseDto] }),
    __param(0, (0, common_1.Param)('site')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getGuardsBySite", null);
__decorate([
    (0, common_1.Get)('by-shift/:shift'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guards by shift' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of guards on shift', type: [guards_dto_1.GuardResponseDto] }),
    __param(0, (0, common_1.Param)('shift')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getGuardsByShift", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total guard count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Total count of guards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)('count-by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard count by status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard count grouped by status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "getCountByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard details', type: guards_dto_1.GuardResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard by employee ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard details', type: guards_dto_1.GuardResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "findByEmployeeId", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update guard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard updated successfully', type: guards_dto_1.GuardResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, guards_dto_1.UpdateGuardDto]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update guard status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard status updated', type: guards_dto_1.GuardResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete guard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Guard not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "remove", null);
exports.GuardsController = GuardsController = __decorate([
    (0, swagger_1.ApiTags)('guards'),
    (0, common_1.Controller)('guards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [guards_service_1.GuardsService])
], GuardsController);
//# sourceMappingURL=guards.controller.js.map