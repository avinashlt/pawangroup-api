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
exports.SosAlertSchema = exports.SosAlert = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let SosAlert = class SosAlert {
};
exports.SosAlert = SosAlert;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SosAlert.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], SosAlert.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], SosAlert.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert location' }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number, address: String }, required: true }),
    __metadata("design:type", Object)
], SosAlert.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert status', enum: ['active', 'responding', 'resolved', 'false-alarm'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['active', 'responding', 'resolved', 'false-alarm'], default: 'active' }),
    __metadata("design:type", String)
], SosAlert.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Priority level (always critical for SOS)' }),
    (0, mongoose_1.Prop)({ default: 'critical' }),
    __metadata("design:type", String)
], SosAlert.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Responder user ID', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SosAlert.prototype, "respondedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Response timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], SosAlert.prototype, "respondedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Resolution timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], SosAlert.prototype, "resolvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SosAlert.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID reference', required: false }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SosAlert.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SosAlert.prototype, "siteName", void 0);
exports.SosAlert = SosAlert = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SosAlert);
exports.SosAlertSchema = mongoose_1.SchemaFactory.createForClass(SosAlert);
exports.SosAlertSchema.index({ status: 1, timestamp: -1 });
exports.SosAlertSchema.index({ guardId: 1, timestamp: -1 });
//# sourceMappingURL=sos-alert.schema.js.map