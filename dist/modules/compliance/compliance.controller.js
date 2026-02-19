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
exports.ComplianceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compliance_service_1 = require("./compliance.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const compliance_dto_1 = require("./dto/compliance.dto");
let ComplianceController = class ComplianceController {
    constructor(service) {
        this.service = service;
    }
    async createChecklist(dto) { return this.service.createChecklist(dto); }
    async findChecklists(siteId, type, isActive) {
        return this.service.findChecklists(siteId, type, isActive);
    }
    async findChecklistById(id) { return this.service.findChecklistById(id); }
    async updateChecklist(id, dto) { return this.service.updateChecklist(id, dto); }
    async deleteChecklist(id) { await this.service.deleteChecklist(id); return { message: 'Checklist deleted' }; }
    async submitChecklist(dto) { return this.service.submitChecklist(dto); }
    async findSubmissions(checklistId, guardId, siteId, status) {
        return this.service.findSubmissions(checklistId, guardId, siteId, status);
    }
    async getPendingReviews() { return this.service.getPendingReviews(); }
    async findSubmissionById(id) { return this.service.findSubmissionById(id); }
    async reviewSubmission(id, dto) {
        return this.service.reviewSubmission(id, dto.status, dto.reviewedBy, dto.reviewNotes);
    }
    async getComplianceMetrics(siteId, startDate, endDate) {
        return this.service.getComplianceMetrics(siteId, startDate, endDate);
    }
};
exports.ComplianceController = ComplianceController;
__decorate([
    (0, common_1.Post)('checklists'),
    (0, swagger_1.ApiOperation)({ summary: 'Create checklist' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compliance_dto_1.CreateChecklistDto]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "createChecklist", null);
__decorate([
    (0, common_1.Get)('checklists'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checklists' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('siteId')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "findChecklists", null);
__decorate([
    (0, common_1.Get)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checklist by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "findChecklistById", null);
__decorate([
    (0, common_1.Put)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update checklist' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, compliance_dto_1.UpdateChecklistDto]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "updateChecklist", null);
__decorate([
    (0, common_1.Delete)('checklists/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete checklist' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "deleteChecklist", null);
__decorate([
    (0, common_1.Post)('submissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit checklist' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [compliance_dto_1.SubmitChecklistDto]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "submitChecklist", null);
__decorate([
    (0, common_1.Get)('submissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get checklist submissions' }),
    (0, swagger_1.ApiQuery)({ name: 'checklistId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('checklistId')),
    __param(1, (0, common_1.Query)('guardId')),
    __param(2, (0, common_1.Query)('siteId')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "findSubmissions", null);
__decorate([
    (0, common_1.Get)('submissions/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending submissions for review' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "getPendingReviews", null);
__decorate([
    (0, common_1.Get)('submissions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submission by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "findSubmissionById", null);
__decorate([
    (0, common_1.Patch)('submissions/:id/review'),
    (0, swagger_1.ApiOperation)({ summary: 'Review checklist submission' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, compliance_dto_1.ReviewSubmissionDto]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "reviewSubmission", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get compliance metrics' }),
    (0, swagger_1.ApiQuery)({ name: 'siteId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Query)('siteId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ComplianceController.prototype, "getComplianceMetrics", null);
exports.ComplianceController = ComplianceController = __decorate([
    (0, swagger_1.ApiTags)('compliance'),
    (0, common_1.Controller)('compliance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [compliance_service_1.ComplianceService])
], ComplianceController);
//# sourceMappingURL=compliance.controller.js.map