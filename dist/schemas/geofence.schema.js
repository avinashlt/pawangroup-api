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
exports.GeofenceAlertSchema = exports.GeofenceAlert = exports.GeofenceSchema = exports.Geofence = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Geofence = class Geofence {
};
exports.Geofence = Geofence;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geofence name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Geofence.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Site', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Geofence.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Geofence.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geofence type', enum: ['circle', 'polygon'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['circle', 'polygon'] }),
    __metadata("design:type", String)
], Geofence.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Center coordinates for circle type', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], Geofence.prototype, "center", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Radius in meters for circle type', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Geofence.prototype, "radius", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Polygon coordinates', required: false }),
    (0, mongoose_1.Prop)({ type: [{ latitude: Number, longitude: Number }] }),
    __metadata("design:type", Array)
], Geofence.prototype, "polygon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is geofence active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Geofence.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert on exit' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Geofence.prototype, "alertOnExit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert on entry' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Geofence.prototype, "alertOnEntry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assigned guard IDs' }),
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Guard' }], default: [] }),
    __metadata("design:type", Array)
], Geofence.prototype, "assignedGuards", void 0);
exports.Geofence = Geofence = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Geofence);
exports.GeofenceSchema = mongoose_1.SchemaFactory.createForClass(Geofence);
let GeofenceAlert = class GeofenceAlert {
};
exports.GeofenceAlert = GeofenceAlert;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geofence ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Geofence', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GeofenceAlert.prototype, "geofenceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geofence name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GeofenceAlert.prototype, "geofenceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GeofenceAlert.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GeofenceAlert.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert type', enum: ['entry', 'exit'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['entry', 'exit'] }),
    __metadata("design:type", String)
], GeofenceAlert.prototype, "alertType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Alert timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], GeofenceAlert.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Location at time of alert' }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number }, required: true }),
    __metadata("design:type", Object)
], GeofenceAlert.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is alert acknowledged' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], GeofenceAlert.prototype, "acknowledged", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Acknowledged by user', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeofenceAlert.prototype, "acknowledgedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Acknowledged timestamp', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], GeofenceAlert.prototype, "acknowledgedAt", void 0);
exports.GeofenceAlert = GeofenceAlert = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], GeofenceAlert);
exports.GeofenceAlertSchema = mongoose_1.SchemaFactory.createForClass(GeofenceAlert);
exports.GeofenceSchema.index({ siteId: 1 });
exports.GeofenceAlertSchema.index({ geofenceId: 1, timestamp: -1 });
exports.GeofenceAlertSchema.index({ acknowledged: 1 });
//# sourceMappingURL=geofence.schema.js.map