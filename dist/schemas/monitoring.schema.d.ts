import { Document, Types } from 'mongoose';
export type MonitoringDocument = Monitoring & Document;
export declare class Monitoring {
    guardId: Types.ObjectId;
    guardName: string;
    siteId: Types.ObjectId;
    siteName: string;
    startTime: Date;
    endTime?: Date;
    status: string;
    lastHeartbeat?: Date;
    deviceId?: string;
}
export declare const MonitoringSchema: import("mongoose").Schema<Monitoring, import("mongoose").Model<Monitoring, any, any, any, Document<unknown, any, Monitoring, any, {}> & Monitoring & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Monitoring, Document<unknown, {}, import("mongoose").FlatRecord<Monitoring>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Monitoring> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type SleepAlertDocument = SleepAlert & Document;
export declare class SleepAlert {
    guardId: Types.ObjectId;
    guardName: string;
    siteId: Types.ObjectId;
    siteName: string;
    detectedAt: Date;
    duration: number;
    location: {
        latitude: number;
        longitude: number;
    };
    status: string;
    acknowledgedBy?: string;
    acknowledgedAt?: Date;
    detectionMethod?: string;
    confidence?: number;
    notes?: string;
}
export declare const SleepAlertSchema: import("mongoose").Schema<SleepAlert, import("mongoose").Model<SleepAlert, any, any, any, Document<unknown, any, SleepAlert, any, {}> & SleepAlert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SleepAlert, Document<unknown, {}, import("mongoose").FlatRecord<SleepAlert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SleepAlert> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type AiAlertDocument = AiAlert & Document;
export declare class AiAlert {
    type: string;
    siteId: Types.ObjectId;
    siteName: string;
    cameraId: Types.ObjectId;
    cameraName: string;
    detectedAt: Date;
    confidence: number;
    thumbnail?: string;
    videoClip?: string;
    status: string;
    reviewedBy?: string;
    reviewedAt?: Date;
    detectedObjects?: string[];
    boundingBoxes?: {
        x: number;
        y: number;
        width: number;
        height: number;
        label: string;
    }[];
    notes?: string;
}
export declare const AiAlertSchema: import("mongoose").Schema<AiAlert, import("mongoose").Model<AiAlert, any, any, any, Document<unknown, any, AiAlert, any, {}> & AiAlert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AiAlert, Document<unknown, {}, import("mongoose").FlatRecord<AiAlert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AiAlert> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
