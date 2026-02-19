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
exports.PerformanceRecordSchema = exports.PerformanceRecord = exports.ReportConfigSchema = exports.ReportConfig = exports.ReportSchema = exports.Report = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Report = class Report {
};
exports.Report = Report;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report type' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Report.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Report.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start date' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Report.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End date' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Report.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report data' }),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Report.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report status' }),
    (0, mongoose_1.Prop)({ default: 'generating', enum: ['generating', 'completed', 'failed'] }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Generated at' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Report.prototype, "generatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Report.prototype, "fileUrl", void 0);
exports.Report = Report = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Report);
exports.ReportSchema = mongoose_1.SchemaFactory.createForClass(Report);
exports.ReportSchema.index({ type: 1, generatedAt: -1 });
let ReportConfig = class ReportConfig {
};
exports.ReportConfig = ReportConfig;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ReportConfig.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report type', enum: ['attendance', 'incidents', 'patrol', 'performance', 'compliance', 'custom'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['attendance', 'incidents', 'patrol', 'performance', 'compliance', 'custom'] }),
    __metadata("design:type", String)
], ReportConfig.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report frequency', enum: ['daily', 'weekly', 'monthly', 'custom'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['daily', 'weekly', 'monthly', 'custom'] }),
    __metadata("design:type", String)
], ReportConfig.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email recipients' }),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], ReportConfig.prototype, "recipients", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Report filters' }),
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], ReportConfig.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is report active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ReportConfig.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last generated timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], ReportConfig.prototype, "lastGenerated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created by user ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ReportConfig.prototype, "createdBy", void 0);
exports.ReportConfig = ReportConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ReportConfig);
exports.ReportConfigSchema = mongoose_1.SchemaFactory.createForClass(ReportConfig);
let PerformanceRecord = class PerformanceRecord {
};
exports.PerformanceRecord = PerformanceRecord;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PerformanceRecord.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PerformanceRecord.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Period (YYYY-MM or YYYY-WW)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PerformanceRecord.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attendance rate (%)' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "attendanceRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Punctuality rate (%)' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "punctualityRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint compliance rate (%)' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "checkpointComplianceRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of incidents reported' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "incidentsReported", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average response time in minutes' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "avgResponseTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total work hours' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "totalWorkHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Overtime hours' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "overtimeHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of late arrivals' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "lateArrivals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of early departures' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "earlyDepartures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of missed checkpoints' }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PerformanceRecord.prototype, "missedCheckpoints", void 0);
exports.PerformanceRecord = PerformanceRecord = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PerformanceRecord);
exports.PerformanceRecordSchema = mongoose_1.SchemaFactory.createForClass(PerformanceRecord);
exports.ReportConfigSchema.index({ type: 1, isActive: 1 });
exports.PerformanceRecordSchema.index({ guardId: 1, period: 1 }, { unique: true });
//# sourceMappingURL=report.schema.js.map