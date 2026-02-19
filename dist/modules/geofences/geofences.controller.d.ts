import { GeofencesService } from './geofences.service';
import { CreateGeofenceDto, UpdateGeofenceDto, CreateAlertDto, AcknowledgeAlertDto } from './dto/geofences.dto';
export declare class GeofencesController {
    private readonly service;
    constructor(service: GeofencesService);
    create(dto: CreateGeofenceDto): Promise<import("../../schemas/geofence.schema").Geofence>;
    findAll(siteId?: string): Promise<import("../../schemas/geofence.schema").Geofence[]>;
    getAlerts(geofenceId?: string, acknowledged?: boolean): Promise<import("../../schemas/geofence.schema").GeofenceAlert[]>;
    createAlert(dto: CreateAlertDto): Promise<import("../../schemas/geofence.schema").GeofenceAlert>;
    acknowledgeAlert(id: string, dto: AcknowledgeAlertDto): Promise<import("../../schemas/geofence.schema").GeofenceAlert>;
    findById(id: string): Promise<import("../../schemas/geofence.schema").Geofence>;
    update(id: string, dto: UpdateGeofenceDto): Promise<import("../../schemas/geofence.schema").Geofence>;
    assignGuard(id: string, guardId: string): Promise<import("../../schemas/geofence.schema").Geofence>;
    removeGuard(id: string, guardId: string): Promise<import("../../schemas/geofence.schema").Geofence>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
