import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Location, LocationDocument } from '../../schemas/location.schema';
import { UpdateLocationDto } from './dto/locations.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async updateLocation(
    guardId: string,
    guardName: string,
    latitude: number,
    longitude: number,
    address?: string,
    accuracy?: number,
    batteryLevel?: number,
  ): Promise<Location> {
    const location = await this.locationModel.findOneAndUpdate(
      { guardId: new Types.ObjectId(guardId) },
      {
        guardId: new Types.ObjectId(guardId),
        guardName,
        latitude,
        longitude,
        address,
        accuracy,
        batteryLevel,
        timestamp: new Date(),
        isActive: true,
      },
      { upsert: true, new: true },
    );
    return location;
  }

  async getActiveLocations(): Promise<Location[]> {
    // Get locations updated within the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.locationModel.find({
      isActive: true,
      timestamp: { $gte: fiveMinutesAgo },
    }).sort({ guardName: 1 });
  }

  async getAllLocations(): Promise<Location[]> {
    return this.locationModel.find().sort({ guardName: 1 });
  }

  async getGuardLocation(guardId: string): Promise<Location> {
    const location = await this.locationModel.findOne({
      guardId: new Types.ObjectId(guardId),
    });
    if (!location) {
      throw new NotFoundException(`Location for guard ${guardId} not found`);
    }
    return location;
  }

  async getLocationHistory(guardId: string, startDate?: Date, endDate?: Date): Promise<Location[]> {
    const query: any = { guardId: new Types.ObjectId(guardId) };
    
    if (startDate && endDate) {
      query.timestamp = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.timestamp = { $gte: startDate };
    } else if (endDate) {
      query.timestamp = { $lte: endDate };
    }

    return this.locationModel.find(query).sort({ timestamp: -1 });
  }

  async setInactive(guardId: string): Promise<Location> {
    const location = await this.locationModel.findOneAndUpdate(
      { guardId: new Types.ObjectId(guardId) },
      { isActive: false },
      { new: true },
    );
    if (!location) {
      throw new NotFoundException(`Location for guard ${guardId} not found`);
    }
    return location;
  }

  async getLocationsNearby(
    latitude: number,
    longitude: number,
    radiusKm: number = 1,
  ): Promise<Location[]> {
    // Simple distance calculation (for production, use MongoDB geospatial queries)
    const locations = await this.locationModel.find({ isActive: true });
    
    return locations.filter(loc => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        loc.latitude,
        loc.longitude,
      );
      return distance <= radiusKm;
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
