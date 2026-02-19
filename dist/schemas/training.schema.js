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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardTrainingSchema = exports.GuardTraining = exports.TrainingSchema = exports.Training = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Training = class Training {
};
exports.Training = Training;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training description' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Training.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training type', enum: ['mandatory', 'optional', 'certification'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['mandatory', 'optional', 'certification'] }),
    __metadata("design:type", String)
], Training.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Duration in hours' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Training.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Validity period in months', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Training.prototype, "validityPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is training active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Training.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training content/materials URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Training.prototype, "contentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Passing score percentage', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Training.prototype, "passingScore", void 0);
exports.Training = Training = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Training);
exports.TrainingSchema = mongoose_1.SchemaFactory.createForClass(Training);
let GuardTraining = class GuardTraining {
};
exports.GuardTraining = GuardTraining;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GuardTraining.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GuardTraining.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Training', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GuardTraining.prototype, "trainingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Training name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GuardTraining.prototype, "trainingName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Training status',
        enum: ['not-started', 'in-progress', 'completed', 'expired'],
    }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['not-started', 'in-progress', 'completed', 'expired'],
        default: 'not-started',
    }),
    __metadata("design:type", String)
], GuardTraining.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], GuardTraining.prototype, "assignedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], GuardTraining.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Completion timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], GuardTraining.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Expiry date', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], GuardTraining.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Score achieved', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], GuardTraining.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Certificate URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GuardTraining.prototype, "certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Progress percentage', required: false }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], GuardTraining.prototype, "progress", void 0);
exports.GuardTraining = GuardTraining = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], GuardTraining);
exports.GuardTrainingSchema = mongoose_1.SchemaFactory.createForClass(GuardTraining);
exports.GuardTrainingSchema.index({ guardId: 1, status: 1 });
exports.GuardTrainingSchema.index({ trainingId: 1 });
exports.GuardTrainingSchema.index({ dueDate: 1, status: 1 });
//# sourceMappingURL=training.schema.js.map