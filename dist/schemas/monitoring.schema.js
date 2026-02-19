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
exports.AiAlertSchema = exports.AiAlert = exports.SleepAlertSchema = exports.SleepAlert = exports.MonitoringSchema = exports.Monitoring = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Monitoring = class Monitoring {
};
exports.Monitoring = Monitoring;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Monitoring.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Monitoring.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Monitoring.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Monitoring.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session start time' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Monitoring.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session end time' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Monitoring.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session status' }),
    (0, mongoose_1.Prop)({ required: true, enum: ['active', 'ended'], default: 'active' }),
    __metadata("design:type", String)
], Monitoring.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last heartbeat' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Monitoring.prototype, "lastHeartbeat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device ID' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Monitoring.prototype, "deviceId", void 0);
exports.Monitoring = Monitoring = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Monitoring);
exports.MonitoringSchema = mongoose_1.SchemaFactory.createForClass(Monitoring);
exports.MonitoringSchema.index({ guardId: 1, status: 1 });
exports.MonitoringSchema.index({ siteId: 1, status: 1 });
let SleepAlert = class SleepAlert {
};
exports.SleepAlert = SleepAlert;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SleepAlert.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SleepAlert.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SleepAlert.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SleepAlert.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detection timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SleepAlert.prototype, "detectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Duration in seconds' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SleepAlert.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Location at detection' }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number }, required: true }),
    __metadata("design:type", Object)
], SleepAlert.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert status', enum: ['active', 'acknowledged', 'false-positive'] }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['active', 'acknowledged', 'false-positive'],
        default: 'active',
    }),
    __metadata("design:type", String)
], SleepAlert.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Acknowledged by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SleepAlert.prototype, "acknowledgedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Acknowledgement timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], SleepAlert.prototype, "acknowledgedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detection method', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SleepAlert.prototype, "detectionMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Confidence score', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SleepAlert.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SleepAlert.prototype, "notes", void 0);
exports.SleepAlert = SleepAlert = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SleepAlert);
exports.SleepAlertSchema = mongoose_1.SchemaFactory.createForClass(SleepAlert);
exports.SleepAlertSchema.index({ status: 1, detectedAt: -1 });
exports.SleepAlertSchema.index({ guardId: 1, detectedAt: -1 });
exports.SleepAlertSchema.index({ siteId: 1, detectedAt: -1 });
let AiAlert = class AiAlert {
};
exports.AiAlert = AiAlert;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Alert type',
        enum: ['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection'],
    }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection'],
    }),
    __metadata("design:type", String)
], AiAlert.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AiAlert.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiAlert.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Camera', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AiAlert.prototype, "cameraId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiAlert.prototype, "cameraName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detection timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], AiAlert.prototype, "detectedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Confidence percentage' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AiAlert.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thumbnail URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AiAlert.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Video clip URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AiAlert.prototype, "videoClip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert status', enum: ['new', 'reviewing', 'confirmed', 'false-positive'] }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['new', 'reviewing', 'confirmed', 'false-positive'],
        default: 'new',
    }),
    __metadata("design:type", String)
], AiAlert.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviewed by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AiAlert.prototype, "reviewedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Review timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], AiAlert.prototype, "reviewedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detected objects', required: false }),
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], AiAlert.prototype, "detectedObjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bounding boxes', required: false }),
    (0, mongoose_1.Prop)({ type: [{ x: Number, y: Number, width: Number, height: Number, label: String }] }),
    __metadata("design:type", Array)
], AiAlert.prototype, "boundingBoxes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AiAlert.prototype, "notes", void 0);
exports.AiAlert = AiAlert = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AiAlert);
exports.AiAlertSchema = mongoose_1.SchemaFactory.createForClass(AiAlert);
exports.AiAlertSchema.index({ status: 1, detectedAt: -1 });
exports.AiAlertSchema.index({ siteId: 1, detectedAt: -1 });
exports.AiAlertSchema.index({ cameraId: 1, detectedAt: -1 });
exports.AiAlertSchema.index({ type: 1, status: 1 });
//# sourceMappingURL=monitoring.schema.js.map