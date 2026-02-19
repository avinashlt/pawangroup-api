import { CheckpointsService } from './checkpoints.service';
import { CreateCheckpointDto, UpdateCheckpointDto, RecordScanDto } from './dto/checkpoints.dto';
export declare class CheckpointsController {
    private readonly service;
    constructor(service: CheckpointsService);
    create(dto: CreateCheckpointDto): Promise<import("../../schemas/checkpoint.schema").Checkpoint>;
    findAll(siteId?: string): Promise<import("../../schemas/checkpoint.schema").Checkpoint[]>;
    getMissed(siteId?: string): Promise<import("../../schemas/checkpoint.schema").Checkpoint[]>;
    getScans(checkpointId?: string, guardId?: string, limit?: number): Promise<import("../../schemas/checkpoint.schema").CheckpointScan[]>;
    recordScan(dto: RecordScanDto): Promise<import("../../schemas/checkpoint.schema").CheckpointScan>;
    findOne(id: string): Promise<import("../../schemas/checkpoint.schema").Checkpoint>;
    update(id: string, dto: UpdateCheckpointDto): Promise<import("../../schemas/checkpoint.schema").Checkpoint>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
