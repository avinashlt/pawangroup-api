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
exports.GuardSchema = exports.Guard = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Guard = class Guard {
};
exports.Guard = Guard;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name of the guard' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Guard.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee ID' }),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Guard.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Guard.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Photo URL', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Guard.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assigned site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Guard.prototype, "assignedSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift type', enum: ['morning', 'evening', 'night'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['morning', 'evening', 'night'] }),
    __metadata("design:type", String)
], Guard.prototype, "shift", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard status', enum: ['active', 'inactive', 'on-leave'] }),
    (0, mongoose_1.Prop)({ required: true, enum: ['active', 'inactive', 'on-leave'], default: 'active' }),
    __metadata("design:type", String)
], Guard.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Guard.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of joining' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Guard.prototype, "dateOfJoining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Emergency contact', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Guard.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Guard.prototype, "address", void 0);
exports.Guard = Guard = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Guard);
exports.GuardSchema = mongoose_1.SchemaFactory.createForClass(Guard);
//# sourceMappingURL=guard.schema.js.map