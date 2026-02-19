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
exports.IncidentSchema = exports.Incident = exports.IncidentLocation = exports.IncidentMedia = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let IncidentMedia = class IncidentMedia {
};
exports.IncidentMedia = IncidentMedia;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Media type', enum: ['image', 'video'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['image', 'video'] }),
    __metadata("design:type", String)
], IncidentMedia.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Media URL' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IncidentMedia.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thumbnail URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], IncidentMedia.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Upload timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], IncidentMedia.prototype, "uploadedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size in bytes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], IncidentMedia.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Duration in seconds (for videos)', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], IncidentMedia.prototype, "duration", void 0);
exports.IncidentMedia = IncidentMedia = __decorate([
    (0, mongoose_1.Schema)()
], IncidentMedia);
let IncidentLocation = class IncidentLocation {
};
exports.IncidentLocation = IncidentLocation;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], IncidentLocation.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], IncidentLocation.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], IncidentLocation.prototype, "address", void 0);
exports.IncidentLocation = IncidentLocation = __decorate([
    (0, mongoose_1.Schema)()
], IncidentLocation);
let Incident = class Incident {
};
exports.Incident = Incident;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Incident.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incident title' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incident description' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Severity level', enum: ['low', 'medium', 'high', 'critical'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['low', 'medium', 'high', 'critical'] }),
    __metadata("design:type", String)
], Incident.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incident timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Incident.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incident location' }),
    (0, mongoose_1.Prop)({ type: IncidentLocation, required: true }),
    __metadata("design:type", IncidentLocation)
], Incident.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Media attachments', type: [IncidentMedia] }),
    (0, mongoose_1.Prop)({ type: [IncidentMedia], default: [] }),
    __metadata("design:type", Array)
], Incident.prototype, "media", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Incident status', enum: ['new', 'reviewing', 'resolved', 'escalated'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['new', 'reviewing', 'resolved', 'escalated'], default: 'new' }),
    __metadata("design:type", String)
], Incident.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Incident.prototype, "site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resolved by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Incident.prototype, "resolvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resolution timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Incident.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Incident.prototype, "notes", void 0);
exports.Incident = Incident = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Incident);
exports.IncidentSchema = mongoose_1.SchemaFactory.createForClass(Incident);
exports.IncidentSchema.index({ site: 1, timestamp: -1 });
exports.IncidentSchema.index({ status: 1 });
exports.IncidentSchema.index({ severity: 1 });
//# sourceMappingURL=incident.schema.js.map