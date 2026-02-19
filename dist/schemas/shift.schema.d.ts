import { Document, Types } from 'mongoose';
export type ShiftDocument = ScheduledShift & Document;
export type ShiftTemplateDocument = ShiftTemplate & Document;
export type ScheduledShiftDocument = ScheduledShift & Document;
export type ShiftSwapRequestDocument = ShiftSwapRequest & Document;
export type TimeOffRequestDocument = TimeOffRequest & Document;
export declare class ShiftTemplate {
    name: string;
    startTime: string;
    endTime: string;
    breakDuration: number;
    daysOfWeek: number[];
    siteId: Types.ObjectId;
    siteName: string;
    requiredGuards: number;
    isActive: boolean;
}
export declare const ShiftTemplateSchema: import("mongoose").Schema<ShiftTemplate, import("mongoose").Model<ShiftTemplate, any, any, any, Document<unknown, any, ShiftTemplate, any, {}> & ShiftTemplate & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShiftTemplate, Document<unknown, {}, import("mongoose").FlatRecord<ShiftTemplate>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ShiftTemplate> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ScheduledShift {
    templateId?: Types.ObjectId;
    guardId: Types.ObjectId;
    guardName: string;
    siteId: Types.ObjectId;
    siteName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    checkInTime?: string;
    checkOutTime?: string;
    checkInLocation?: {
        latitude: number;
        longitude: number;
    };
    checkOutLocation?: {
        latitude: number;
        longitude: number;
    };
}
export declare const ScheduledShiftSchema: import("mongoose").Schema<ScheduledShift, import("mongoose").Model<ScheduledShift, any, any, any, Document<unknown, any, ScheduledShift, any, {}> & ScheduledShift & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ScheduledShift, Document<unknown, {}, import("mongoose").FlatRecord<ScheduledShift>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ScheduledShift> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ShiftSwapRequest {
    requesterId: Types.ObjectId;
    requesterName: string;
    targetGuardId: Types.ObjectId;
    targetGuardName: string;
    originalShiftId: Types.ObjectId;
    swapShiftId: Types.ObjectId;
    originalDate: string;
    swapDate: string;
    reason: string;
    status: string;
    requestedAt: Date;
    processedBy?: string;
    processedAt?: Date;
    notes?: string;
}
export declare const ShiftSwapRequestSchema: import("mongoose").Schema<ShiftSwapRequest, import("mongoose").Model<ShiftSwapRequest, any, any, any, Document<unknown, any, ShiftSwapRequest, any, {}> & ShiftSwapRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ShiftSwapRequest, Document<unknown, {}, import("mongoose").FlatRecord<ShiftSwapRequest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ShiftSwapRequest> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class TimeOffRequest {
    guardId: Types.ObjectId;
    guardName: string;
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    requestedAt: Date;
    processedBy?: string;
    processedAt?: Date;
    notes?: string;
}
export declare const TimeOffRequestSchema: import("mongoose").Schema<TimeOffRequest, import("mongoose").Model<TimeOffRequest, any, any, any, Document<unknown, any, TimeOffRequest, any, {}> & TimeOffRequest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimeOffRequest, Document<unknown, {}, import("mongoose").FlatRecord<TimeOffRequest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TimeOffRequest> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export { ScheduledShift as Shift };
export { ScheduledShiftSchema as ShiftSchema };
