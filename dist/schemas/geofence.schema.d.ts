import { Document, Types } from 'mongoose';
export type GeofenceDocument = Geofence & Document;
export type GeofenceAlertDocument = GeofenceAlert & Document;
export declare class Geofence {
    name: string;
    siteId: Types.ObjectId;
    siteName: string;
    type: string;
    center?: {
        latitude: number;
        longitude: number;
    };
    radius?: number;
    polygon?: {
        latitude: number;
        longitude: number;
    }[];
    isActive: boolean;
    alertOnExit: boolean;
    alertOnEntry: boolean;
    assignedGuards: Types.ObjectId[];
}
export declare const GeofenceSchema: import("mongoose").Schema<Geofence, import("mongoose").Model<Geofence, any, any, any, Document<unknown, any, Geofence, any, {}> & Geofence & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Geofence, Document<unknown, {}, import("mongoose").FlatRecord<Geofence>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Geofence> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class GeofenceAlert {
    geofenceId: Types.ObjectId;
    geofenceName: string;
    guardId: Types.ObjectId;
    guardName: string;
    alertType: string;
    timestamp: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    acknowledged: boolean;
    acknowledgedBy?: string;
    acknowledgedAt?: Date;
}
export declare const GeofenceAlertSchema: import("mongoose").Schema<GeofenceAlert, import("mongoose").Model<GeofenceAlert, any, any, any, Document<unknown, any, GeofenceAlert, any, {}> & GeofenceAlert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GeofenceAlert, Document<unknown, {}, import("mongoose").FlatRecord<GeofenceAlert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<GeofenceAlert> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
