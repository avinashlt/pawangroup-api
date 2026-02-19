import { Document, Types } from 'mongoose';
export type SosAlertDocument = SosAlert & Document;
export declare class SosAlert {
    guardId: Types.ObjectId;
    guardName: string;
    timestamp: Date;
    location: {
        latitude: number;
        longitude: number;
        address?: string;
    };
    status: string;
    priority: string;
    respondedBy?: string;
    respondedAt?: Date;
    resolvedAt?: Date;
    notes?: string;
    siteId?: Types.ObjectId;
    siteName?: string;
}
export declare const SosAlertSchema: import("mongoose").Schema<SosAlert, import("mongoose").Model<SosAlert, any, any, any, Document<unknown, any, SosAlert, any, {}> & SosAlert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SosAlert, Document<unknown, {}, import("mongoose").FlatRecord<SosAlert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SosAlert> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
