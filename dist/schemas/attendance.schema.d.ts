import { Document, Types } from 'mongoose';
export type AttendanceDocument = Attendance & Document;
export declare class Attendance {
    guardId: Types.ObjectId;
    guardName: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    status: string;
    site: string;
    shift: string;
    workHours?: number;
    notes?: string;
    checkInLocation?: {
        latitude: number;
        longitude: number;
    };
    checkOutLocation?: {
        latitude: number;
        longitude: number;
    };
}
export declare const AttendanceSchema: import("mongoose").Schema<Attendance, import("mongoose").Model<Attendance, any, any, any, Document<unknown, any, Attendance, any, {}> & Attendance & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attendance, Document<unknown, {}, import("mongoose").FlatRecord<Attendance>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Attendance> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
