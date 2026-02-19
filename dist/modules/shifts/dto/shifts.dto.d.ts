export declare class CreateShiftDto {
    guardId: string;
    guardName: string;
    siteId: string;
    siteName: string;
    date: string;
    startTime: string;
    endTime: string;
    status?: string;
    notes?: string;
}
declare const UpdateShiftDto_base: import("@nestjs/common").Type<Partial<CreateShiftDto>>;
export declare class UpdateShiftDto extends UpdateShiftDto_base {
}
export declare class CreateTemplateDto {
    name: string;
    siteId: string;
    siteName: string;
    startTime: string;
    endTime: string;
    daysOfWeek?: number[];
    isActive?: boolean;
    minGuards?: number;
    maxGuards?: number;
}
declare const UpdateTemplateDto_base: import("@nestjs/common").Type<Partial<CreateTemplateDto>>;
export declare class UpdateTemplateDto extends UpdateTemplateDto_base {
}
export declare class CreateSwapRequestDto {
    requesterId: string;
    requesterName: string;
    targetGuardId: string;
    targetGuardName: string;
    shiftId: string;
    reason?: string;
}
export declare class UpdateSwapRequestDto {
    status: string;
    approvedBy?: string;
}
export declare class CreateTimeOffRequestDto {
    guardId: string;
    guardName: string;
    startDate: string;
    endDate: string;
    type: string;
    reason?: string;
}
export declare class UpdateTimeOffRequestDto {
    status: string;
    approvedBy?: string;
}
export {};
