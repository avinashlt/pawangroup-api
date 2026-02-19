export declare class CreateReportDto {
    name: string;
    type: string;
    siteId?: string;
    startDate?: string;
    endDate?: string;
    filters?: string[];
    format?: string;
}
export declare class CreateConfigDto {
    name: string;
    type: string;
    schedule?: string;
    recipients?: string[];
    isActive?: boolean;
    filters?: Record<string, any>;
}
declare const UpdateConfigDto_base: import("@nestjs/common").Type<Partial<CreateConfigDto>>;
export declare class UpdateConfigDto extends UpdateConfigDto_base {
}
export {};
