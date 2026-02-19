import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Monitoring, MonitoringDocument, SleepAlert, SleepAlertDocument, AiAlert, AiAlertDocument } from '../../schemas/monitoring.schema';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectModel(Monitoring.name) private monitoringModel: Model<MonitoringDocument>,
    @InjectModel(SleepAlert.name) private sleepAlertModel: Model<SleepAlertDocument>,
    @InjectModel(AiAlert.name) private aiAlertModel: Model<AiAlertDocument>,
  ) {}

  // Monitoring sessions
  async createSession(data: any): Promise<Monitoring> {
    const session = new this.monitoringModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      siteId: new Types.ObjectId(data.siteId as any),
      startTime: new Date(),
      status: 'active',
    });
    return session.save();
  }

  async findSessions(guardId?: string, siteId?: string, status?: string): Promise<Monitoring[]> {
    const query: any = {};
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (status) query.status = status;
    return this.monitoringModel.find(query).sort({ startTime: -1 });
  }

  async getActiveSessions(): Promise<Monitoring[]> {
    return this.monitoringModel.find({ status: 'active' }).sort({ startTime: -1 });
  }

  async endSession(id: string): Promise<Monitoring> {
    const session = await this.monitoringModel.findByIdAndUpdate(
      id,
      { status: 'ended', endTime: new Date() },
      { new: true },
    );
    if (!session) throw new NotFoundException(`Session ${id} not found`);
    return session;
  }

  async updateHeartbeat(id: string): Promise<Monitoring> {
    const session = await this.monitoringModel.findByIdAndUpdate(
      id,
      { lastHeartbeat: new Date() },
      { new: true },
    );
    if (!session) throw new NotFoundException(`Session ${id} not found`);
    return session;
  }

  // Sleep alerts
  async createSleepAlert(data: any): Promise<SleepAlert> {
    const alert = new this.sleepAlertModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      siteId: new Types.ObjectId(data.siteId as any),
      cameraId: data.cameraId ? new Types.ObjectId(data.cameraId as any) : undefined,
      timestamp: new Date(),
      acknowledged: false,
    });
    return alert.save();
  }

  async findSleepAlerts(guardId?: string, siteId?: string, acknowledged?: boolean): Promise<SleepAlert[]> {
    const query: any = {};
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (acknowledged !== undefined) query.acknowledged = acknowledged;
    return this.sleepAlertModel.find(query).sort({ timestamp: -1 });
  }

  async acknowledgeSleepAlert(id: string, acknowledgedBy: string): Promise<SleepAlert> {
    const alert = await this.sleepAlertModel.findByIdAndUpdate(
      id,
      { acknowledged: true, acknowledgedBy, acknowledgedAt: new Date() },
      { new: true },
    );
    if (!alert) throw new NotFoundException(`Sleep alert ${id} not found`);
    return alert;
  }

  // AI alerts
  async createAIAlert(data: any): Promise<AiAlert> {
    const alert = new this.aiAlertModel({
      ...data,
      siteId: new Types.ObjectId(data.siteId as any),
      cameraId: data.cameraId ? new Types.ObjectId(data.cameraId as any) : undefined,
      timestamp: new Date(),
      status: 'new',
    });
    return alert.save();
  }

  async findAIAlerts(siteId?: string, type?: string, status?: string): Promise<AiAlert[]> {
    const query: any = {};
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (type) query.type = type;
    if (status) query.status = status;
    return this.aiAlertModel.find(query).sort({ timestamp: -1 });
  }

  async updateAIAlertStatus(id: string, status: string, reviewedBy?: string, notes?: string): Promise<AiAlert> {
    const update: any = { status, reviewedAt: new Date() };
    if (reviewedBy) update.reviewedBy = reviewedBy;
    if (notes) update.reviewNotes = notes;
    const alert = await this.aiAlertModel.findByIdAndUpdate(id, update, { new: true });
    if (!alert) throw new NotFoundException(`AI alert ${id} not found`);
    return alert;
  }

  // Metrics
  async getMonitoringMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any> {
    const matchStage: any = {};
    if (siteId) matchStage.siteId = new Types.ObjectId(siteId);
    if (startDate && endDate) matchStage.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const [sleepStats, aiStats] = await Promise.all([
      this.sleepAlertModel.aggregate([{ $match: matchStage }, { $group: { _id: '$acknowledged', count: { $sum: 1 } } }]),
      this.aiAlertModel.aggregate([{ $match: matchStage }, { $group: { _id: '$type', count: { $sum: 1 } } }]),
    ]);

    return {
      sleepAlerts: { total: sleepStats.reduce((a, b) => a + b.count, 0), acknowledged: sleepStats.find(s => s._id === true)?.count || 0 },
      aiAlerts: { total: aiStats.reduce((a, b) => a + b.count, 0), byType: aiStats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}) },
    };
  }
}
