import { Model } from 'mongoose';
import { Location, LocationDocument } from '../../schemas/location.schema';
export declare class LocationsService {
    private locationModel;
    constructor(locationModel: Model<LocationDocument>);
    updateLocation(guardId: string, guardName: string, latitude: number, longitude: number, address?: string, accuracy?: number, batteryLevel?: number): Promise<Location>;
    getActiveLocations(): Promise<Location[]>;
    getAllLocations(): Promise<Location[]>;
    getGuardLocation(guardId: string): Promise<Location>;
    getLocationHistory(guardId: string, startDate?: Date, endDate?: Date): Promise<Location[]>;
    setInactive(guardId: string): Promise<Location>;
    getLocationsNearby(latitude: number, longitude: number, radiusKm?: number): Promise<Location[]>;
    private calculateDistance;
    private toRad;
}
