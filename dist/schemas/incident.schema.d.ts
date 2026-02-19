import { Document, Types } from 'mongoose';
export type IncidentDocument = Incident & Document;
export declare class IncidentMedia {
    type: string;
    url: string;
    thumbnail?: string;
    uploadedAt: Date;
    size?: number;
    duration?: number;
}
export declare class IncidentLocation {
    latitude: number;
    longitude: number;
    address?: string;
}
export declare class Incident {
    guardId: Types.ObjectId;
    guardName: string;
    title: string;
    description: string;
    severity: string;
    timestamp: Date;
    location: IncidentLocation;
    media: IncidentMedia[];
    status: string;
    site: string;
    resolvedBy?: string;
    resolvedAt?: Date;
    notes?: string;
}
export declare const IncidentSchema: import("mongoose").Schema<Incident, import("mongoose").Model<Incident, any, any, any, Document<unknown, any, Incident, any, {}> & Incident & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Incident, Document<unknown, {}, import("mongoose").FlatRecord<Incident>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Incident> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
