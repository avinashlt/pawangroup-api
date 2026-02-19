declare class LocationDto {
    latitude: number;
    longitude: number;
}
export declare class CreateSosAlertDto {
    guardId: string;
    guardName: string;
    siteId: string;
    siteName: string;
    location: LocationDto;
    alertType?: string;
    message?: string;
}
export declare class RespondDto {
    respondedBy: string;
}
export declare class ResolveDto {
    resolvedBy: string;
    resolutionNotes?: string;
}
export {};
