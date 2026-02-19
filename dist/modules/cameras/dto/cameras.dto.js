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
exports.BulkUpdateStatusDto = exports.UpdateStatusDto = exports.UpdateCameraDto = exports.CreateCameraDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class LocationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "longitude", void 0);
class CreateCameraDto {
}
exports.CreateCameraDto = CreateCameraDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "siteId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['fixed', 'ptz', 'dome', 'bullet', 'thermal'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['fixed', 'ptz', 'dome', 'bullet', 'thermal']),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "streamUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "rtspUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: LocationDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LocationDto),
    __metadata("design:type", LocationDto)
], CreateCameraDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['online', 'offline', 'maintenance', 'error'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['online', 'offline', 'maintenance', 'error']),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCameraDto.prototype, "isRecording", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCameraDto.prototype, "hasAI", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCameraDto.prototype, "aiFeatures", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCameraDto.prototype, "resolution", void 0);
class UpdateCameraDto extends (0, swagger_1.PartialType)(CreateCameraDto) {
}
exports.UpdateCameraDto = UpdateCameraDto;
class UpdateStatusDto {
}
exports.UpdateStatusDto = UpdateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['online', 'offline', 'maintenance', 'error'] }),
    (0, class_validator_1.IsEnum)(['online', 'offline', 'maintenance', 'error']),
    __metadata("design:type", String)
], UpdateStatusDto.prototype, "status", void 0);
class BulkUpdateStatusDto {
}
exports.BulkUpdateStatusDto = BulkUpdateStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BulkUpdateStatusDto.prototype, "cameraIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['online', 'offline', 'maintenance', 'error'] }),
    (0, class_validator_1.IsEnum)(['online', 'offline', 'maintenance', 'error']),
    __metadata("design:type", String)
], BulkUpdateStatusDto.prototype, "status", void 0);
//# sourceMappingURL=cameras.dto.js.map