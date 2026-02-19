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
exports.SiteSchema = exports.Site = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Site = class Site {
};
exports.Site = Site;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Site.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site address' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Site.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Client name' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Site.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contact person name', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Site.prototype, "contactPerson", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contact phone number', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Site.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contact email', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Site.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Is site active' }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Site.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site location coordinates', required: false }),
    (0, mongoose_1.Prop)({ type: { latitude: Number, longitude: Number } }),
    __metadata("design:type", Object)
], Site.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of required guards' }),
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Site.prototype, "requiredGuards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Operating hours', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Site.prototype, "operatingHours", void 0);
exports.Site = Site = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Site);
exports.SiteSchema = mongoose_1.SchemaFactory.createForClass(Site);
//# sourceMappingURL=site.schema.js.map