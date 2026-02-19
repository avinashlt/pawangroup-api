import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Camera, CameraDocument } from '../../schemas/camera.schema';

@Injectable()
export class CamerasService {
  constructor(@InjectModel(Camera.name) private cameraModel: Model<CameraDocument>) {}

  async create(data: any): Promise<Camera> {
    const camera = new this.cameraModel({
      ...data,
      siteId: new Types.ObjectId(data.siteId as any),
    });
    return camera.save();
  }

  async findAll(siteId?: string, status?: string, type?: string): Promise<Camera[]> {
    const query: any = {};
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (status) query.status = status;
    if (type) query.type = type;
    return this.cameraModel.find(query).sort({ siteName: 1, name: 1 });
  }

  async findById(id: string): Promise<Camera> {
    const camera = await this.cameraModel.findById(id);
    if (!camera) throw new NotFoundException(`Camera ${id} not found`);
    return camera;
  }

  async update(id: string, data: any): Promise<Camera> {
    const camera = await this.cameraModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!camera) throw new NotFoundException(`Camera ${id} not found`);
    return camera;
  }

  async delete(id: string): Promise<void> {
    const result = await this.cameraModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Camera ${id} not found`);
  }

  async updateStatus(id: string, status: string): Promise<Camera> {
    const camera = await this.cameraModel.findByIdAndUpdate(
      id,
      { status, lastOnline: status === 'online' ? new Date() : undefined },
      { new: true },
    );
    if (!camera) throw new NotFoundException(`Camera ${id} not found`);
    return camera;
  }

  async toggleRecording(id: string): Promise<Camera> {
    const camera = await this.cameraModel.findById(id);
    if (!camera) throw new NotFoundException(`Camera ${id} not found`);
    camera.isRecording = !camera.isRecording;
    return camera.save();
  }

  async getOnlineCameras(): Promise<Camera[]> {
    return this.cameraModel.find({ status: 'online' }).sort({ siteName: 1, name: 1 });
  }

  async getOfflineCameras(): Promise<Camera[]> {
    return this.cameraModel.find({ status: { $ne: 'online' } }).sort({ siteName: 1, name: 1 });
  }

  async getCamerasBySite(siteId: string): Promise<Camera[]> {
    return this.cameraModel.find({ siteId: new Types.ObjectId(siteId) }).sort({ name: 1 });
  }

  async getCameraStats(): Promise<any> {
    const [statusStats, typeStats] = await Promise.all([
      this.cameraModel.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      this.cameraModel.aggregate([{ $group: { _id: '$type', count: { $sum: 1 } } }]),
    ]);
    return {
      total: statusStats.reduce((a, b) => a + b.count, 0),
      byStatus: statusStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}),
      byType: typeStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}),
    };
  }

  async bulkUpdateStatus(cameraIds: string[], status: string): Promise<{ updated: number }> {
    const result = await this.cameraModel.updateMany(
      { _id: { $in: cameraIds.map(id => new Types.ObjectId(id)) } },
      { status, lastOnline: status === 'online' ? new Date() : undefined },
    );
    return { updated: result.modifiedCount };
  }
}
