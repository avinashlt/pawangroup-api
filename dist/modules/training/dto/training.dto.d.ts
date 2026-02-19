export declare class CreateTrainingDto {
    name: string;
    description?: string;
    type: string;
    durationMinutes?: number;
    modules?: string[];
    videoUrl?: string;
    documentUrl?: string;
    passingScore?: number;
    isActive?: boolean;
    isMandatory?: boolean;
    validityMonths?: number;
}
declare const UpdateTrainingDto_base: import("@nestjs/common").Type<Partial<CreateTrainingDto>>;
export declare class UpdateTrainingDto extends UpdateTrainingDto_base {
}
export declare class AssignTrainingDto {
    guardId: string;
    guardName: string;
    trainingId: string;
    trainingName: string;
    dueDate?: string;
    assignedBy?: string;
}
export declare class CompleteTrainingDto {
    score?: number;
}
export declare class UpdateProgressDto {
    progress: number;
}
export {};
