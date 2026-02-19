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
exports.CameraSchema = exports.Camera = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Camera = class Camera {
};
exports.Camera = Camera;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Camera.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Camera.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Camera.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera location description' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Camera.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera type', enum: ['indoor', 'outdoor', 'ptz'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['indoor', 'outdoor', 'ptz'] }),
    __metadata("design:type", String)
], Camera.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is camera online' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Camera.prototype, "isOnline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Camera status' }),
    (0, mongoose_1.Prop)({ default: 'online', enum: ['online', 'offline', 'maintenance', 'error'] }),
    __metadata("design:type", String)
], Camera.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is recording enabled' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Camera.prototype, "isRecording", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is AI detection enabled' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Camera.prototype, "aiEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last seen timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Camera.prototype, "lastSeen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stream URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Camera.prototype, "streamUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Camera.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resolution', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Camera.prototype, "resolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Manufacturer', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Camera.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Model', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Camera.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recording enabled' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Camera.prototype, "recordingEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Motion detection enabled' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Camera.prototype, "motionDetectionEnabled", void 0);
exports.Camera = Camera = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Camera);
exports.CameraSchema = mongoose_1.SchemaFactory.createForClass(Camera);
exports.CameraSchema.index({ siteId: 1 });
exports.CameraSchema.index({ isOnline: 1 });
exports.CameraSchema.index({ aiEnabled: 1 });
//# sourceMappingURL=camera.schema.js.map