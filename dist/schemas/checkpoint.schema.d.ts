import { Document, Types } from 'mongoose';
export type CheckpointDocument = Checkpoint & Document;
export type CheckpointScanDocument = CheckpointScan & Document;
export declare class CheckpointLocation {
    latitude: number;
    longitude: number;
    address?: string;
}
export declare class Checkpoint {
    name: string;
    type: string;
    siteId: Types.ObjectId;
    siteName: string;
    location: CheckpointLocation;
    isActive: boolean;
    scanFrequency: number;
    lastScanned?: Date;
    codeValue?: string;
}
export declare const CheckpointSchema: import("mongoose").Schema<Checkpoint, import("mongoose").Model<Checkpoint, any, any, any, Document<unknown, any, Checkpoint, any, {}> & Checkpoint & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Checkpoint, Document<unknown, {}, import("mongoose").FlatRecord<Checkpoint>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Checkpoint> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class CheckpointScan {
    checkpointId: Types.ObjectId;
    checkpointName: string;
    guardId: Types.ObjectId;
    guardName: string;
    scannedAt: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    status: string;
    notes?: string;
}
export declare const CheckpointScanSchema: import("mongoose").Schema<CheckpointScan, import("mongoose").Model<CheckpointScan, any, any, any, Document<unknown, any, CheckpointScan, any, {}> & CheckpointScan & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CheckpointScan, Document<unknown, {}, import("mongoose").FlatRecord<CheckpointScan>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<CheckpointScan> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
