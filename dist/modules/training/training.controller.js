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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const training_service_1 = require("./training.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const training_dto_1 = require("./dto/training.dto");
let TrainingController = class TrainingController {
    constructor(service) {
        this.service = service;
    }
    async createTraining(dto) { return this.service.createTraining(dto); }
    async findTrainings(type, isActive) { return this.service.findTrainings(type, isActive); }
    async getTrainingMetrics(guardId) { return this.service.getTrainingMetrics(guardId); }
    async getOverdueTrainings() { return this.service.getOverdueTrainings(); }
    async getUpcomingTrainings(days) { return this.service.getUpcomingTrainings(days); }
    async findTrainingById(id) { return this.service.findTrainingById(id); }
    async updateTraining(id, dto) { return this.service.updateTraining(id, dto); }
    async deleteTraining(id) { await this.service.deleteTraining(id); return { message: 'Training deleted' }; }
    async assignTraining(dto) { return this.service.assignTraining(dto); }
    async findGuardTrainings(guardId, trainingId, status) {
        return this.service.findGuardTrainings(guardId, trainingId, status);
    }
    async findGuardTrainingById(id) { return this.service.findGuardTrainingById(id); }
    async startTraining(id) { return this.service.startTraining(id); }
    async completeTraining(id, dto) { return this.service.completeTraining(id, dto.score); }
    async updateProgress(id, dto) { return this.service.updateProgress(id, dto.progress); }
};
exports.TrainingController = TrainingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create training course' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [training_dto_1.CreateTrainingDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "createTraining", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get training courses' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isActive', required: false, type: Boolean }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "findTrainings", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get training metrics' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getTrainingMetrics", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overdue trainings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getOverdueTrainings", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Get upcoming trainings' }),
    (0, swagger_1.ApiQuery)({ name: 'days', required: false, type: Number }),
    __param(0, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "getUpcomingTrainings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get training by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "findTrainingById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update training course' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, training_dto_1.UpdateTrainingDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "updateTraining", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete training course' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "deleteTraining", null);
__decorate([
    (0, common_1.Post)('assignments'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign training to guard' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [training_dto_1.AssignTrainingDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "assignTraining", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard training assignments' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'trainingId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    __param(0, (0, common_1.Query)('guardId')),
    __param(1, (0, common_1.Query)('trainingId')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "findGuardTrainings", null);
__decorate([
    (0, common_1.Get)('assignments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard training assignment by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "findGuardTrainingById", null);
__decorate([
    (0, common_1.Patch)('assignments/:id/start'),
    (0, swagger_1.ApiOperation)({ summary: 'Start training' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "startTraining", null);
__decorate([
    (0, common_1.Patch)('assignments/:id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Complete training' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, training_dto_1.CompleteTrainingDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "completeTraining", null);
__decorate([
    (0, common_1.Patch)('assignments/:id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update training progress' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, training_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "updateProgress", null);
exports.TrainingController = TrainingController = __decorate([
    (0, swagger_1.ApiTags)('training'),
    (0, common_1.Controller)('training'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [training_service_1.TrainingService])
], TrainingController);
//# sourceMappingURL=training.controller.js.map