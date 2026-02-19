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
exports.TrainingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const training_schema_1 = require("../../schemas/training.schema");
let TrainingService = class TrainingService {
    constructor(trainingModel, guardTrainingModel) {
        this.trainingModel = trainingModel;
        this.guardTrainingModel = guardTrainingModel;
    }
    async createTraining(data) {
        const training = new this.trainingModel(data);
        return training.save();
    }
    async findTrainings(type, isActive) {
        const query = {};
        if (type)
            query.type = type;
        if (isActive !== undefined)
            query.isActive = isActive;
        return this.trainingModel.find(query).sort({ name: 1 });
    }
    async findTrainingById(id) {
        const training = await this.trainingModel.findById(id);
        if (!training)
            throw new common_1.NotFoundException(`Training ${id} not found`);
        return training;
    }
    async updateTraining(id, data) {
        const training = await this.trainingModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!training)
            throw new common_1.NotFoundException(`Training ${id} not found`);
        return training;
    }
    async deleteTraining(id) {
        const result = await this.trainingModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Training ${id} not found`);
    }
    async assignTraining(data) {
        const assignment = new this.guardTrainingModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            trainingId: new mongoose_2.Types.ObjectId(data.trainingId),
            status: 'assigned',
            assignedAt: new Date(),
        });
        return assignment.save();
    }
    async findGuardTrainings(guardId, trainingId, status) {
        const query = {};
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (trainingId)
            query.trainingId = new mongoose_2.Types.ObjectId(trainingId);
        if (status)
            query.status = status;
        return this.guardTrainingModel.find(query).sort({ assignedAt: -1 });
    }
    async findGuardTrainingById(id) {
        const assignment = await this.guardTrainingModel.findById(id);
        if (!assignment)
            throw new common_1.NotFoundException(`Guard training ${id} not found`);
        return assignment;
    }
    async startTraining(id) {
        const assignment = await this.guardTrainingModel.findByIdAndUpdate(id, { status: 'in-progress', startedAt: new Date() }, { new: true });
        if (!assignment)
            throw new common_1.NotFoundException(`Guard training ${id} not found`);
        return assignment;
    }
    async completeTraining(id, score) {
        const assignment = await this.guardTrainingModel.findByIdAndUpdate(id, { status: 'completed', completedAt: new Date(), score }, { new: true });
        if (!assignment)
            throw new common_1.NotFoundException(`Guard training ${id} not found`);
        return assignment;
    }
    async updateProgress(id, progress) {
        const assignment = await this.guardTrainingModel.findByIdAndUpdate(id, { progress }, { new: true });
        if (!assignment)
            throw new common_1.NotFoundException(`Guard training ${id} not found`);
        return assignment;
    }
    async getTrainingMetrics(guardId) {
        const matchStage = {};
        if (guardId)
            matchStage.guardId = new mongoose_2.Types.ObjectId(guardId);
        const stats = await this.guardTrainingModel.aggregate([
            { $match: matchStage },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        const statusCounts = stats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {});
        const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
        const completed = statusCounts['completed'] || 0;
        return {
            total,
            statusBreakdown: statusCounts,
            completionRate: total ? (completed / total * 100).toFixed(1) : 0,
        };
    }
    async getOverdueTrainings() {
        return this.guardTrainingModel.find({
            status: { $in: ['assigned', 'in-progress'] },
            dueDate: { $lt: new Date() },
        }).sort({ dueDate: 1 });
    }
    async getUpcomingTrainings(days = 7) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return this.guardTrainingModel.find({
            status: 'assigned',
            dueDate: { $gte: new Date(), $lte: futureDate },
        }).sort({ dueDate: 1 });
    }
};
exports.TrainingService = TrainingService;
exports.TrainingService = TrainingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(training_schema_1.Training.name)),
    __param(1, (0, mongoose_1.InjectModel)(training_schema_1.GuardTraining.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TrainingService);
//# sourceMappingURL=training.service.js.map