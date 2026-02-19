import { LocationsService } from './locations.service';
import { UpdateLocationDto } from './dto/locations.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    updateLocation(updateDto: UpdateLocationDto): Promise<import("../../schemas/location.schema").Location>;
    getActiveLocations(): Promise<import("../../schemas/location.schema").Location[]>;
    getAllLocations(): Promise<import("../../schemas/location.schema").Location[]>;
    getLocationsNearby(latitude: number, longitude: number, radius?: number): Promise<import("../../schemas/location.schema").Location[]>;
    getGuardLocation(guardId: string): Promise<import("../../schemas/location.schema").Location>;
    getLocationHistory(guardId: string, startDate?: string, endDate?: string): Promise<import("../../schemas/location.schema").Location[]>;
    setInactive(guardId: string): Promise<import("../../schemas/location.schema").Location>;
}
