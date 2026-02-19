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
exports.GuardResponseDto = exports.GuardFilterDto = exports.UpdateGuardDto = exports.CreateGuardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateGuardDto {
}
exports.CreateGuardDto = CreateGuardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name of the guard', example: 'Rajesh Kumar' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee ID', example: 'EMP001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number', example: '+91 98765 43210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Photo URL' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assigned site', example: 'Tech Park Gate A' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "assignedSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift type', enum: ['morning', 'evening', 'night'] }),
    (0, class_validator_1.IsEnum)(['morning', 'evening', 'night']),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "shift", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Guard status', enum: ['active', 'inactive', 'on-leave'], default: 'active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'inactive', 'on-leave']),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date of joining' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateGuardDto.prototype, "dateOfJoining", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Emergency contact' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuardDto.prototype, "address", void 0);
class UpdateGuardDto extends (0, swagger_1.PartialType)(CreateGuardDto) {
}
exports.UpdateGuardDto = UpdateGuardDto;
class GuardFilterDto {
}
exports.GuardFilterDto = GuardFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by status', enum: ['active', 'inactive', 'on-leave'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['active', 'inactive', 'on-leave']),
    __metadata("design:type", String)
], GuardFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by shift', enum: ['morning', 'evening', 'night'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['morning', 'evening', 'night']),
    __metadata("design:type", String)
], GuardFilterDto.prototype, "shift", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by assigned site' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuardFilterDto.prototype, "assignedSite", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by name, employee ID, or phone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuardFilterDto.prototype, "search", void 0);
class GuardResponseDto {
}
exports.GuardResponseDto = GuardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Full name' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee ID' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Photo URL' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assigned site' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "assignedSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shift type', enum: ['morning', 'evening', 'night'] }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "shift", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status', enum: ['active', 'inactive', 'on-leave'] }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date of joining' }),
    __metadata("design:type", Date)
], GuardResponseDto.prototype, "dateOfJoining", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Emergency contact' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Address' }),
    __metadata("design:type", String)
], GuardResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], GuardResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], GuardResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=guards.dto.js.map