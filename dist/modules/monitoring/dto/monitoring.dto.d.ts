export declare class CreateSessionDto {
    guardId: string;
    guardName: string;
    siteId: string;
    siteName: string;
    deviceId?: string;
}
export declare class CreateSleepAlertDto {
    guardId: string;
    guardName: string;
    siteId: string;
    siteName: string;
    cameraId?: string;
    cameraName?: string;
    imageUrl?: string;
    confidence?: number;
}
export declare class AcknowledgeAlertDto {
    acknowledgedBy: string;
}
export declare class CreateAIAlertDto {
    siteId: string;
    siteName: string;
    cameraId?: string;
    cameraName?: string;
    type: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    confidence?: number;
}
export declare class UpdateAIAlertDto {
    status: string;
    reviewedBy?: string;
    reviewNotes?: string;
}
