declare class LocationDto {
    latitude: number;
    longitude: number;
    address?: string;
}
declare class MediaDto {
    type: string;
    url: string;
    thumbnail?: string;
    size?: number;
    duration?: number;
}
export declare class CreateIncidentDto {
    guardId: string;
    guardName: string;
    title: string;
    description: string;
    timestamp?: string;
    severity: string;
    location: LocationDto;
    site: string;
    media?: MediaDto[];
    notes?: string;
}
declare const UpdateIncidentDto_base: import("@nestjs/common").Type<Partial<CreateIncidentDto>>;
export declare class UpdateIncidentDto extends UpdateIncidentDto_base {
}
export declare class IncidentFilterDto {
    startDate?: string;
    endDate?: string;
    guardId?: string;
    severity?: string;
    status?: string;
    site?: string;
}
export declare class UpdateStatusDto {
    status: string;
    resolvedBy?: string;
    notes?: string;
}
export declare class AddMediaDto {
    type: string;
    url: string;
    thumbnail?: string;
    size?: number;
    duration?: number;
}
export {};
