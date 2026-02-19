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
exports.LocationSchema = exports.Location = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Location = class Location {
};
exports.Location = Location;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard ID reference' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Guard', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Location.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guard name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Location.prototype, "guardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Latitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Location.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Longitude' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Location.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp of location update' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Location.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Address', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is guard currently active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Location.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accuracy in meters', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "accuracy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Battery level percentage', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Location.prototype, "batteryLevel", void 0);
exports.Location = Location = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Location);
exports.LocationSchema = mongoose_1.SchemaFactory.createForClass(Location);
exports.LocationSchema.index({ guardId: 1, timestamp: -1 });
exports.LocationSchema.index({ timestamp: -1 });
exports.LocationSchema.index({ latitude: 1, longitude: 1 });
//# sourceMappingURL=location.schema.js.map