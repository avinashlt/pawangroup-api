declare class LocationDto {
    latitude: number;
    longitude: number;
}
export declare class CreateSiteDto {
    name: string;
    address: string;
    clientName: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    isActive?: boolean;
    location?: LocationDto;
    requiredGuards?: number;
    operatingHours?: string;
}
declare const UpdateSiteDto_base: import("@nestjs/common").Type<Partial<CreateSiteDto>>;
export declare class UpdateSiteDto extends UpdateSiteDto_base {
}
export {};
