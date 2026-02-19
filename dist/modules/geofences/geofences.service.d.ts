import { Model } from 'mongoose';
import { Geofence, GeofenceDocument, GeofenceAlert, GeofenceAlertDocument } from '../../schemas/geofence.schema';
export declare class GeofencesService {
    private geofenceModel;
    private alertModel;
    constructor(geofenceModel: Model<GeofenceDocument>, alertModel: Model<GeofenceAlertDocument>);
    create(data: any): Promise<Geofence>;
    findAll(siteId?: string): Promise<Geofence[]>;
    findById(id: string): Promise<Geofence>;
    update(id: string, data: any): Promise<Geofence>;
    delete(id: string): Promise<void>;
    createAlert(data: {
        geofenceId: string;
        geofenceName: string;
        guardId: string;
        guardName: string;
        alertType: string;
        location: {
            latitude: number;
            longitude: number;
        };
    }): Promise<GeofenceAlert>;
    getAlerts(geofenceId?: string, acknowledged?: boolean): Promise<GeofenceAlert[]>;
    acknowledgeAlert(id: string, acknowledgedBy: string): Promise<GeofenceAlert>;
    assignGuard(geofenceId: string, guardId: string): Promise<Geofence>;
    removeGuard(geofenceId: string, guardId: string): Promise<Geofence>;
}
