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
exports.ShiftSchema = exports.Shift = exports.TimeOffRequestSchema = exports.TimeOffRequest = exports.ShiftSwapRequestSchema = exports.ShiftSwapRequest = exports.ScheduledShiftSchema = exports.ScheduledShift = exports.ShiftTemplateSchema = exports.ShiftTemplate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let ShiftTemplate = class ShiftTemplate {
};
exports.ShiftTemplate = ShiftTemplate;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftTemplate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start time (HH:mm)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftTemplate.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End time (HH:mm)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftTemplate.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Break duration in minutes' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], ShiftTemplate.prototype, "breakDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Days of week (0-6, Sunday-Saturday)' }),
    (0, mongoose_1.Prop)({ type: [Number], default: [] }),
    __metadata("design:type", Array)
], ShiftTemplate.prototype, "daysOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShiftTemplate.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftTemplate.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of required guards' }),
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], ShiftTemplate.prototype, "requiredGuards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is template active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ShiftTemplate.prototype, "isActive", void 0);
exports.ShiftTemplate = ShiftTemplate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ShiftTemplate);
exports.ShiftTemplateSchema = mongoose_1.SchemaFactory.createForClass(ShiftTemplate);
let ScheduledShift = class ScheduledShift {
};
exports.ScheduledShift = ScheduledShift;
exports.Shift = ScheduledShift;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Template ID reference', required: false }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ShiftTemplate' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ScheduledShift.prototype, "templateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ScheduledShift.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ScheduledShift.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift date (YYYY-MM-DD)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start time (HH:mm)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End time (HH:mm)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift status', enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' }),
    __metadata("design:type", String)
], ScheduledShift.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in time', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ScheduledShift.prototype, "checkInTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out time', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ScheduledShift.prototype, "checkOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in location', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], ScheduledShift.prototype, "checkInLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out location', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], ScheduledShift.prototype, "checkOutLocation", void 0);
exports.Shift = exports.ScheduledShift = ScheduledShift = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ScheduledShift);
exports.ScheduledShiftSchema = mongoose_1.SchemaFactory.createForClass(ScheduledShift);
exports.ShiftSchema = exports.ScheduledShiftSchema;
let ShiftSwapRequest = class ShiftSwapRequest {
};
exports.ShiftSwapRequest = ShiftSwapRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Requester guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShiftSwapRequest.prototype, "requesterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Requester name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "requesterName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShiftSwapRequest.prototype, "targetGuardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "targetGuardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original shift ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ScheduledShift', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShiftSwapRequest.prototype, "originalShiftId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Swap shift ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'ScheduledShift', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ShiftSwapRequest.prototype, "swapShiftId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original shift date' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "originalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Swap shift date' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "swapDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for swap request' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request status', enum: ['pending', 'approved', 'rejected'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], ShiftSwapRequest.prototype, "requestedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Processed by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "processedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Processed timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ShiftSwapRequest.prototype, "processedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ShiftSwapRequest.prototype, "notes", void 0);
exports.ShiftSwapRequest = ShiftSwapRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ShiftSwapRequest);
exports.ShiftSwapRequestSchema = mongoose_1.SchemaFactory.createForClass(ShiftSwapRequest);
let TimeOffRequest = class TimeOffRequest {
};
exports.TimeOffRequest = TimeOffRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], TimeOffRequest.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Time-off type', enum: ['sick', 'vacation', 'personal', 'emergency'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['sick', 'vacation', 'personal', 'emergency'] }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date (YYYY-MM-DD)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date (YYYY-MM-DD)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for time-off' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request status', enum: ['pending', 'approved', 'rejected'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Request timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], TimeOffRequest.prototype, "requestedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Processed by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "processedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Processed timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], TimeOffRequest.prototype, "processedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "notes", void 0);
exports.TimeOffRequest = TimeOffRequest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], TimeOffRequest);
exports.TimeOffRequestSchema = mongoose_1.SchemaFactory.createForClass(TimeOffRequest);
exports.ShiftTemplateSchema.index({ siteId: 1 });
exports.ScheduledShiftSchema.index({ guardId: 1, date: 1 });
exports.ScheduledShiftSchema.index({ siteId: 1, date: 1 });
exports.ShiftSwapRequestSchema.index({ status: 1, requestedAt: -1 });
exports.TimeOffRequestSchema.index({ status: 1, requestedAt: -1 });
//# sourceMappingURL=shift.schema.js.map