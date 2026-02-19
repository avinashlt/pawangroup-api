import { Document } from 'mongoose';
export type GuardDocument = Guard & Document;
export declare class Guard {
    name: string;
    employeeId: string;
    phone: string;
    photo?: string;
    assignedSite: string;
    shift: string;
    status: string;
    email?: string;
    dateOfJoining?: Date;
    emergencyContact?: string;
    address?: string;
}
export declare const GuardSchema: import("mongoose").Schema<Guard, import("mongoose").Model<Guard, any, any, any, Document<unknown, any, Guard, any, {}> & Guard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Guard, Document<unknown, {}, import("mongoose").FlatRecord<Guard>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Guard> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
