import { Document, Types } from 'mongoose';
export declare class ChecklistItem {
    description: string;
    isRequired: boolean;
    order: number;
}
export type ChecklistDocument = Checklist & Document;
export declare class Checklist {
    name: string;
    siteId: Types.ObjectId;
    siteName: string;
    type: string;
    items: ChecklistItem[];
    isActive: boolean;
}
export declare const ChecklistSchema: import("mongoose").Schema<Checklist, import("mongoose").Model<Checklist, any, any, any, Document<unknown, any, Checklist, any, {}> & Checklist & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Checklist, Document<unknown, {}, import("mongoose").FlatRecord<Checklist>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Checklist> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export type ChecklistSubmissionDocument = ChecklistSubmission & Document;
export declare class CompletedItem {
    itemId: string;
    isCompleted: boolean;
    notes?: string;
    photo?: string;
}
export declare class ChecklistSubmission {
    checklistId: Types.ObjectId;
    checklistName: string;
    guardId: Types.ObjectId;
    guardName: string;
    siteId: Types.ObjectId;
    siteName: string;
    submittedAt: Date;
    completedItems: CompletedItem[];
    overallNotes?: string;
    status: string;
}
export declare const ChecklistSubmissionSchema: import("mongoose").Schema<ChecklistSubmission, import("mongoose").Model<ChecklistSubmission, any, any, any, Document<unknown, any, ChecklistSubmission, any, {}> & ChecklistSubmission & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChecklistSubmission, Document<unknown, {}, import("mongoose").FlatRecord<ChecklistSubmission>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ChecklistSubmission> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
