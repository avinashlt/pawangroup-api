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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const locations_service_1 = require("./locations.service");
const locations_dto_1 = require("./dto/locations.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LocationsController = class LocationsController {
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    async updateLocation(updateDto) {
        return this.locationsService.updateLocation(updateDto.guardId, updateDto.guardName, updateDto.latitude, updateDto.longitude, updateDto.address, updateDto.accuracy, updateDto.batteryLevel);
    }
    async getActiveLocations() {
        return this.locationsService.getActiveLocations();
    }
    async getAllLocations() {
        return this.locationsService.getAllLocations();
    }
    async getLocationsNearby(latitude, longitude, radius) {
        return this.locationsService.getLocationsNearby(latitude, longitude, radius || 1);
    }
    async getGuardLocation(guardId) {
        return this.locationsService.getGuardLocation(guardId);
    }
    async getLocationHistory(guardId, startDate, endDate) {
        return this.locationsService.getLocationHistory(guardId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
    }
    async setInactive(guardId) {
        return this.locationsService.setInactive(guardId);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Post)('update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update guard location' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location updated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [locations_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active guard locations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active locations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getActiveLocations", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guard locations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all locations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getAllLocations", null);
__decorate([
    (0, common_1.Get)('nearby'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guards near a location' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nearby guards' }),
    (0, swagger_1.ApiQuery)({ name: 'latitude', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'longitude', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'radius', required: false, type: Number, description: 'Radius in km (default: 1)' }),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __param(2, (0, common_1.Query)('radius')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getLocationsNearby", null);
__decorate([
    (0, common_1.Get)('guard/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard current location' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard location' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getGuardLocation", null);
__decorate([
    (0, common_1.Get)('history/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guard location history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location history' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Param)('guardId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getLocationHistory", null);
__decorate([
    (0, common_1.Patch)(':guardId/inactive'),
    (0, swagger_1.ApiOperation)({ summary: 'Set guard location as inactive' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location set to inactive' }),
    __param(0, (0, common_1.Param)('guardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "setInactive", null);
exports.LocationsController = LocationsController = __decorate([
    (0, swagger_1.ApiTags)('locations'),
    (0, common_1.Controller)('locations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map