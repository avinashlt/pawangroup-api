import { Model } from 'mongoose';
import { Checkpoint, CheckpointDocument, CheckpointScan, CheckpointScanDocument } from '../../schemas/checkpoint.schema';
export declare class CheckpointsService {
    private checkpointModel;
    private scanModel;
    constructor(checkpointModel: Model<CheckpointDocument>, scanModel: Model<CheckpointScanDocument>);
    createCheckpoint(data: any): Promise<Checkpoint>;
    findAllCheckpoints(siteId?: string): Promise<Checkpoint[]>;
    findCheckpointById(id: string): Promise<Checkpoint>;
    updateCheckpoint(id: string, data: any): Promise<Checkpoint>;
    deleteCheckpoint(id: string): Promise<void>;
    recordScan(data: {
        checkpointId: string;
        checkpointName: string;
        guardId: string;
        guardName: string;
        location: {
            latitude: number;
            longitude: number;
        };
        notes?: string;
    }): Promise<CheckpointScan>;
    getScans(checkpointId?: string, guardId?: string, limit?: number): Promise<CheckpointScan[]>;
    getMissedScans(siteId?: string): Promise<Checkpoint[]>;
}
