import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Checkpoint, CheckpointDocument, CheckpointScan, CheckpointScanDocument } from '../../schemas/checkpoint.schema';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectModel(Checkpoint.name) private checkpointModel: Model<CheckpointDocument>,
    @InjectModel(CheckpointScan.name) private scanModel: Model<CheckpointScanDocument>,
  ) {}

  async createCheckpoint(data: any): Promise<Checkpoint> {
    const checkpoint = new this.checkpointModel({
      ...data,
      siteId: new Types.ObjectId(data.siteId as any),
    });
    return checkpoint.save();
  }

  async findAllCheckpoints(siteId?: string): Promise<Checkpoint[]> {
    const query = siteId ? { siteId: new Types.ObjectId(siteId) } : {};
    return this.checkpointModel.find(query).sort({ siteName: 1, name: 1 });
  }

  async findCheckpointById(id: string): Promise<Checkpoint> {
    const checkpoint = await this.checkpointModel.findById(id);
    if (!checkpoint) throw new NotFoundException(`Checkpoint ${id} not found`);
    return checkpoint;
  }

  async updateCheckpoint(id: string, data: any): Promise<Checkpoint> {
    const checkpoint = await this.checkpointModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!checkpoint) throw new NotFoundException(`Checkpoint ${id} not found`);
    return checkpoint;
  }

  async deleteCheckpoint(id: string): Promise<void> {
    const result = await this.checkpointModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Checkpoint ${id} not found`);
  }

  async recordScan(data: {
    checkpointId: string; checkpointName: string; guardId: string; guardName: string;
    location: { latitude: number; longitude: number }; notes?: string;
  }): Promise<CheckpointScan> {
    const checkpoint = await this.checkpointModel.findById(data.checkpointId);
    if (!checkpoint) throw new NotFoundException(`Checkpoint ${data.checkpointId} not found`);

    // Determine if scan is on-time or late
    const lastScan = checkpoint.lastScanned;
    const now = new Date();
    let status = 'on-time';
    if (lastScan) {
      const diff = (now.getTime() - new Date(lastScan).getTime()) / (1000 * 60);
      if (diff > checkpoint.scanFrequency * 1.1) status = 'late'; // 10% grace
    }

    const scan = new this.scanModel({
      checkpointId: new Types.ObjectId(data.checkpointId),
      checkpointName: data.checkpointName,
      guardId: new Types.ObjectId(data.guardId),
      guardName: data.guardName,
      scannedAt: now,
      location: data.location,
      status,
      notes: data.notes,
    });

    // Update checkpoint's lastScanned
    checkpoint.lastScanned = now;
    await checkpoint.save();

    return scan.save();
  }

  async getScans(checkpointId?: string, guardId?: string, limit: number = 50): Promise<CheckpointScan[]> {
    const query: any = {};
    if (checkpointId) query.checkpointId = new Types.ObjectId(checkpointId);
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    return this.scanModel.find(query).sort({ scannedAt: -1 }).limit(limit);
  }

  async getMissedScans(siteId?: string): Promise<Checkpoint[]> {
    const now = new Date();
    const query: any = { isActive: true };
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    
    const checkpoints = await this.checkpointModel.find(query);
    return checkpoints.filter(cp => {
      if (!cp.lastScanned) return true;
      const diff = (now.getTime() - new Date(cp.lastScanned).getTime()) / (1000 * 60);
      return diff > cp.scanFrequency;
    });
  }
}
