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
exports.AttendanceSchema = exports.Attendance = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Attendance = class Attendance {
};
exports.Attendance = Attendance;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Attendance.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name (denormalized for quick access)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attendance.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attendance date (YYYY-MM-DD)' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attendance.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in time', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attendance.prototype, "checkIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out time', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attendance.prototype, "checkOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attendance status', enum: ['present', 'absent', 'late', 'on-leave'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['present', 'absent', 'late', 'on-leave'] }),
    __metadata("design:type", String)
], Attendance.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attendance.prototype, "site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift type' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attendance.prototype, "shift", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total work hours', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Attendance.prototype, "workHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional notes', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Attendance.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-in location', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], Attendance.prototype, "checkInLocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Check-out location', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], Attendance.prototype, "checkOutLocation", void 0);
exports.Attendance = Attendance = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Attendance);
exports.AttendanceSchema = mongoose_1.SchemaFactory.createForClass(Attendance);
exports.AttendanceSchema.index({ guardId: 1, date: 1 }, { unique: true });
//# sourceMappingURL=attendance.schema.js.map