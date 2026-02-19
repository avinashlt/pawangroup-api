import { CamerasService } from './cameras.service';
import { CreateCameraDto, UpdateCameraDto, UpdateStatusDto, BulkUpdateStatusDto } from './dto/cameras.dto';
export declare class CamerasController {
    private readonly service;
    constructor(service: CamerasService);
    create(dto: CreateCameraDto): Promise<import("../../schemas/camera.schema").Camera>;
    findAll(siteId?: string, status?: string, type?: string): Promise<import("../../schemas/camera.schema").Camera[]>;
    getOnlineCameras(): Promise<import("../../schemas/camera.schema").Camera[]>;
    getOfflineCameras(): Promise<import("../../schemas/camera.schema").Camera[]>;
    getCameraStats(): Promise<any>;
    getCamerasBySite(siteId: string): Promise<import("../../schemas/camera.schema").Camera[]>;
    findById(id: string): Promise<import("../../schemas/camera.schema").Camera>;
    update(id: string, dto: UpdateCameraDto): Promise<import("../../schemas/camera.schema").Camera>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<import("../../schemas/camera.schema").Camera>;
    toggleRecording(id: string): Promise<import("../../schemas/camera.schema").Camera>;
    bulkUpdateStatus(dto: BulkUpdateStatusDto): Promise<{
        updated: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
