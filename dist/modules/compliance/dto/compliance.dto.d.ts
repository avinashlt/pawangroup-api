declare class ChecklistItemDto {
    id: string;
    label: string;
    required?: boolean;
    type?: string;
}
export declare class CreateChecklistDto {
    name: string;
    description?: string;
    type: string;
    siteId?: string;
    items: ChecklistItemDto[];
    isActive?: boolean;
}
declare const UpdateChecklistDto_base: import("@nestjs/common").Type<Partial<CreateChecklistDto>>;
export declare class UpdateChecklistDto extends UpdateChecklistDto_base {
}
declare class SubmissionItemDto {
    itemId: string;
    value: any;
    notes?: string;
}
export declare class SubmitChecklistDto {
    checklistId: string;
    checklistName: string;
    guardId: string;
    guardName: string;
    siteId: string;
    siteName: string;
    responses: SubmissionItemDto[];
    notes?: string;
    photos?: string[];
    signature?: string;
}
export declare class ReviewSubmissionDto {
    status: string;
    reviewedBy: string;
    reviewNotes?: string;
}
export {};
