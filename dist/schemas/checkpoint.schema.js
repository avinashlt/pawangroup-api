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
exports.CheckpointScanSchema = exports.CheckpointScan = exports.CheckpointSchema = exports.Checkpoint = exports.CheckpointLocation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let CheckpointLocation = class CheckpointLocation {
};
exports.CheckpointLocation = CheckpointLocation;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CheckpointLocation.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CheckpointLocation.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CheckpointLocation.prototype, "address", void 0);
exports.CheckpointLocation = CheckpointLocation = __decorate([
    (0, mongoose_1.Schema)()
], CheckpointLocation);
let Checkpoint = class Checkpoint {
};
exports.Checkpoint = Checkpoint;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Checkpoint.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint type', enum: ['nfc', 'qr', 'beacon'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['nfc', 'qr', 'beacon'] }),
    __metadata("design:type", String)
], Checkpoint.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Checkpoint.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Checkpoint.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint location' }),
    (0, mongoose_1.Prop)({ type: CheckpointLocation, required: true }),
    __metadata("design:type", CheckpointLocation)
], Checkpoint.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is checkpoint active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Checkpoint.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Required scan frequency in minutes' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Checkpoint.prototype, "scanFrequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last scanned timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Checkpoint.prototype, "lastScanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NFC/QR code value', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "codeValue", void 0);
exports.Checkpoint = Checkpoint = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Checkpoint);
exports.CheckpointSchema = mongoose_1.SchemaFactory.createForClass(Checkpoint);
let CheckpointScan = class CheckpointScan {
};
exports.CheckpointScan = CheckpointScan;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Checkpoint', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CheckpointScan.prototype, "checkpointId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Checkpoint name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CheckpointScan.prototype, "checkpointName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CheckpointScan.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CheckpointScan.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scan timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], CheckpointScan.prototype, "scannedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scan location' }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number }, required: true }),
    __metadata("design:type", Object)
], CheckpointScan.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scan status', enum: ['on-time', 'late', 'missed'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['on-time', 'late', 'missed'] }),
    __metadata("design:type", String)
], CheckpointScan.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CheckpointScan.prototype, "notes", void 0);
exports.CheckpointScan = CheckpointScan = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CheckpointScan);
exports.CheckpointScanSchema = mongoose_1.SchemaFactory.createForClass(CheckpointScan);
exports.CheckpointSchema.index({ siteId: 1 });
exports.CheckpointScanSchema.index({ checkpointId: 1, scannedAt: -1 });
exports.CheckpointScanSchema.index({ guardId: 1, scannedAt: -1 });
//# sourceMappingURL=checkpoint.schema.js.map