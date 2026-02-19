import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SosAlert, SosAlertDocument } from '../../schemas/sos-alert.schema';

@Injectable()
export class SosAlertsService {
  constructor(@InjectModel(SosAlert.name) private sosAlertModel: Model<SosAlertDocument>) {}

  async create(data: any): Promise<SosAlert> {
    const alert = new this.sosAlertModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      siteId: new Types.ObjectId(data.siteId as any),
      timestamp: new Date(),
      status: 'active',
    });
    return alert.save();
  }

  async findAll(status?: string, siteId?: string): Promise<SosAlert[]> {
    const query: any = {};
    if (status) query.status = status;
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    return this.sosAlertModel.find(query).sort({ timestamp: -1 });
  }

  async findById(id: string): Promise<SosAlert> {
    const alert = await this.sosAlertModel.findById(id);
    if (!alert) throw new NotFoundException(`SOS Alert ${id} not found`);
    return alert;
  }

  async respond(id: string, respondedBy: string): Promise<SosAlert> {
    const alert = await this.sosAlertModel.findByIdAndUpdate(
      id,
      { status: 'responding', respondedBy, respondedAt: new Date() },
      { new: true },
    );
    if (!alert) throw new NotFoundException(`SOS Alert ${id} not found`);
    return alert;
  }

  async resolve(id: string, resolvedBy: string, resolutionNotes?: string): Promise<SosAlert> {
    const alert = await this.sosAlertModel.findByIdAndUpdate(
      id,
      { status: 'resolved', resolvedBy, resolvedAt: new Date(), resolutionNotes },
      { new: true },
    );
    if (!alert) throw new NotFoundException(`SOS Alert ${id} not found`);
    return alert;
  }

  async getActiveAlerts(): Promise<SosAlert[]> {
    return this.sosAlertModel.find({ status: { $in: ['active', 'responding'] } }).sort({ timestamp: -1 });
  }

  async getStats(): Promise<{ total: number; active: number; responding: number; resolved: number; avgResponseTime: number }> {
    const [stats, avgResponse] = await Promise.all([
      this.sosAlertModel.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      this.sosAlertModel.aggregate([
        { $match: { respondedAt: { $exists: true } } },
        { $project: { responseTime: { $subtract: ['$respondedAt', '$timestamp'] } } },
        { $group: { _id: null, avg: { $avg: '$responseTime' } } },
      ]),
    ]);
    const counts = { active: 0, responding: 0, resolved: 0 };
    stats.forEach(s => { if (counts.hasOwnProperty(s._id)) counts[s._id] = s.count; });
    return { total: counts.active + counts.responding + counts.resolved, ...counts, avgResponseTime: avgResponse[0]?.avg || 0 };
  }
}
