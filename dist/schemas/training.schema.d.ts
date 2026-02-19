import { Document, Types } from 'mongoose';
export type TrainingDocument = Training & Document;
export declare class Training {
    name: string;
    description: string;
    type: string;
    duration: number;
    validityPeriod?: number;
    isActive: boolean;
    contentUrl?: string;
    passingScore?: number;
}
export declare const TrainingSchema: import("mongoose").Schema<Training, import("mongoose").Model<Training, any, any, any, Document<unknown, any, Training, any, {}> & Training & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Training, Document<unknown, {}, import("mongoose").FlatRecord<Training>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Training> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type GuardTrainingDocument = GuardTraining & Document;
export declare class GuardTraining {
    guardId: Types.ObjectId;
    guardName: string;
    trainingId: Types.ObjectId;
    trainingName: string;
    status: string;
    assignedAt: Date;
    dueDate: Date;
    completedAt?: Date;
    expiresAt?: Date;
    score?: number;
    certificate?: string;
    progress?: number;
}
export declare const GuardTrainingSchema: import("mongoose").Schema<GuardTraining, import("mongoose").Model<GuardTraining, any, any, any, Document<unknown, any, GuardTraining, any, {}> & GuardTraining & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GuardTraining, Document<unknown, {}, import("mongoose").FlatRecord<GuardTraining>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<GuardTraining> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
