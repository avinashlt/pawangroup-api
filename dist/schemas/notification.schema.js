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
exports.NotificationSchema = exports.Notification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification type', enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'] }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification title' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification message' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notification timestamp' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Notification.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is notification read' }),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Priority level', enum: ['low', 'medium', 'high', 'critical'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['low', 'medium', 'high', 'critical'], default: 'low' }),
    __metadata("design:type", String)
], Notification.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Related entity ID', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "relatedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Related entity type', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "relatedType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target user ID', required: false }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target user role (for broadcast)', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Notification.prototype, "targetRole", void 0);
exports.Notification = Notification = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Notification);
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
exports.NotificationSchema.index({ userId: 1, isRead: 1, timestamp: -1 });
exports.NotificationSchema.index({ timestamp: -1 });
//# sourceMappingURL=notification.schema.js.map