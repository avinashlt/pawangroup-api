declare class CoordinateDto {
    latitude: number;
    longitude: number;
}
export declare class CreateGeofenceDto {
    name: string;
    siteId: string;
    siteName: string;
    type: string;
    center?: CoordinateDto;
    radius?: number;
    polygon?: CoordinateDto[];
    isActive?: boolean;
    alertOnExit?: boolean;
    alertOnEntry?: boolean;
    assignedGuards?: string[];
}
declare const UpdateGeofenceDto_base: import("@nestjs/common").Type<Partial<CreateGeofenceDto>>;
export declare class UpdateGeofenceDto extends UpdateGeofenceDto_base {
}
export declare class CreateAlertDto {
    geofenceId: string;
    geofenceName: string;
    guardId: string;
    guardName: string;
    alertType: string;
    location: CoordinateDto;
}
export declare class AcknowledgeAlertDto {
    acknowledgedBy: string;
}
export {};
