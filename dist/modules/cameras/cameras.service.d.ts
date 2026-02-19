import { Model } from 'mongoose';
import { Camera, CameraDocument } from '../../schemas/camera.schema';
export declare class CamerasService {
    private cameraModel;
    constructor(cameraModel: Model<CameraDocument>);
    create(data: any): Promise<Camera>;
    findAll(siteId?: string, status?: string, type?: string): Promise<Camera[]>;
    findById(id: string): Promise<Camera>;
    update(id: string, data: any): Promise<Camera>;
    delete(id: string): Promise<void>;
    updateStatus(id: string, status: string): Promise<Camera>;
    toggleRecording(id: string): Promise<Camera>;
    getOnlineCameras(): Promise<Camera[]>;
    getOfflineCameras(): Promise<Camera[]>;
    getCamerasBySite(siteId: string): Promise<Camera[]>;
    getCameraStats(): Promise<any>;
    bulkUpdateStatus(cameraIds: string[], status: string): Promise<{
        updated: number;
    }>;
}
