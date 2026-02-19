declare class LocationDto {
    latitude: number;
    longitude: number;
}
export declare class CreateCameraDto {
    name: string;
    siteId: string;
    siteName: string;
    type?: string;
    streamUrl?: string;
    rtspUrl?: string;
    location?: LocationDto;
    status?: string;
    isRecording?: boolean;
    hasAI?: boolean;
    aiFeatures?: string[];
    manufacturer?: string;
    model?: string;
    ipAddress?: string;
    resolution?: string;
}
declare const UpdateCameraDto_base: import("@nestjs/common").Type<Partial<CreateCameraDto>>;
export declare class UpdateCameraDto extends UpdateCameraDto_base {
}
export declare class UpdateStatusDto {
    status: string;
}
export declare class BulkUpdateStatusDto {
    cameraIds: string[];
    status: string;
}
export {};
