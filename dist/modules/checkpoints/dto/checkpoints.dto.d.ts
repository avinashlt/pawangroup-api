declare class LocationDto {
    latitude: number;
    longitude: number;
    address?: string;
}
export declare class CreateCheckpointDto {
    name: string;
    type: string;
    siteId: string;
    siteName: string;
    location: LocationDto;
    isActive?: boolean;
    scanFrequency: number;
    codeIdentifier?: string;
}
declare const UpdateCheckpointDto_base: import("@nestjs/common").Type<Partial<CreateCheckpointDto>>;
export declare class UpdateCheckpointDto extends UpdateCheckpointDto_base {
}
export declare class RecordScanDto {
    checkpointId: string;
    checkpointName: string;
    guardId: string;
    guardName: string;
    location: LocationDto;
    notes?: string;
}
export {};
