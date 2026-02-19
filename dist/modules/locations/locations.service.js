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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const location_schema_1 = require("../../schemas/location.schema");
let LocationsService = class LocationsService {
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async updateLocation(guardId, guardName, latitude, longitude, address, accuracy, batteryLevel) {
        const location = await this.locationModel.findOneAndUpdate({ guardId: new mongoose_2.Types.ObjectId(guardId) }, {
            guardId: new mongoose_2.Types.ObjectId(guardId),
            guardName,
            latitude,
            longitude,
            address,
            accuracy,
            batteryLevel,
            timestamp: new Date(),
            isActive: true,
        }, { upsert: true, new: true });
        return location;
    }
    async getActiveLocations() {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        return this.locationModel.find({
            isActive: true,
            timestamp: { $gte: fiveMinutesAgo },
        }).sort({ guardName: 1 });
    }
    async getAllLocations() {
        return this.locationModel.find().sort({ guardName: 1 });
    }
    async getGuardLocation(guardId) {
        const location = await this.locationModel.findOne({
            guardId: new mongoose_2.Types.ObjectId(guardId),
        });
        if (!location) {
            throw new common_1.NotFoundException(`Location for guard ${guardId} not found`);
        }
        return location;
    }
    async getLocationHistory(guardId, startDate, endDate) {
        const query = { guardId: new mongoose_2.Types.ObjectId(guardId) };
        if (startDate && endDate) {
            query.timestamp = { $gte: startDate, $lte: endDate };
        }
        else if (startDate) {
            query.timestamp = { $gte: startDate };
        }
        else if (endDate) {
            query.timestamp = { $lte: endDate };
        }
        return this.locationModel.find(query).sort({ timestamp: -1 });
    }
    async setInactive(guardId) {
        const location = await this.locationModel.findOneAndUpdate({ guardId: new mongoose_2.Types.ObjectId(guardId) }, { isActive: false }, { new: true });
        if (!location) {
            throw new common_1.NotFoundException(`Location for guard ${guardId} not found`);
        }
        return location;
    }
    async getLocationsNearby(latitude, longitude, radiusKm = 1) {
        const locations = await this.locationModel.find({ isActive: true });
        return locations.filter(loc => {
            const distance = this.calculateDistance(latitude, longitude, loc.latitude, loc.longitude);
            return distance <= radiusKm;
        });
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) *
                Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRad(deg) {
        return deg * (Math.PI / 180);
    }
};
exports.LocationsService = LocationsService;
exports.LocationsService = LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(location_schema_1.Location.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationsService);
//# sourceMappingURL=locations.service.js.map