import { Document, Types } from 'mongoose';
export type CameraDocument = Camera & Document;
export declare class Camera {
    name: string;
    siteId: Types.ObjectId;
    siteName: string;
    location: string;
    type: string;
    isOnline: boolean;
    status: string;
    isRecording: boolean;
    aiEnabled: boolean;
    lastSeen: Date;
    streamUrl?: string;
    ipAddress?: string;
    resolution?: string;
    manufacturer?: string;
    model?: string;
    recordingEnabled: boolean;
    motionDetectionEnabled: boolean;
}
export declare const CameraSchema: import("mongoose").Schema<Camera, import("mongoose").Model<Camera, any, any, any, Document<unknown, any, Camera, any, {}> & Camera & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Camera, Document<unknown, {}, import("mongoose").FlatRecord<Camera>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Camera> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
