import { Document, Types } from 'mongoose';
export type SiteDocument = Site & Document;
export declare class Site {
    name: string;
    address: string;
    clientName: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    isActive: boolean;
    location?: {
        latitude: number;
        longitude: number;
    };
    requiredGuards: number;
    operatingHours?: string;
}
export declare const SiteSchema: import("mongoose").Schema<Site, import("mongoose").Model<Site, any, any, any, Document<unknown, any, Site, any, {}> & Site & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Site, Document<unknown, {}, import("mongoose").FlatRecord<Site>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Site> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
