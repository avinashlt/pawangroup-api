import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Geofence, GeofenceDocument, GeofenceAlert, GeofenceAlertDocument } from '../../schemas/geofence.schema';

@Injectable()
export class GeofencesService {
  constructor(
    @InjectModel(Geofence.name) private geofenceModel: Model<GeofenceDocument>,
    @InjectModel(GeofenceAlert.name) private alertModel: Model<GeofenceAlertDocument>,
  ) {}

  async create(data: any): Promise<Geofence> {
    const geofence = new this.geofenceModel({
      ...data,
      siteId: new Types.ObjectId(data.siteId as any),
      assignedGuards: data.assignedGuards?.map(id => new Types.ObjectId(id as any)) || [],
    });
    return geofence.save();
  }

  async findAll(siteId?: string): Promise<Geofence[]> {
    const query = siteId ? { siteId: new Types.ObjectId(siteId) } : {};
    return this.geofenceModel.find(query).sort({ siteName: 1, name: 1 });
  }

  async findById(id: string): Promise<Geofence> {
    const geofence = await this.geofenceModel.findById(id);
    if (!geofence) throw new NotFoundException(`Geofence ${id} not found`);
    return geofence;
  }

  async update(id: string, data: any): Promise<Geofence> {
    const geofence = await this.geofenceModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!geofence) throw new NotFoundException(`Geofence ${id} not found`);
    return geofence;
  }

  async delete(id: string): Promise<void> {
    const result = await this.geofenceModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Geofence ${id} not found`);
  }

  async createAlert(data: {
    geofenceId: string; geofenceName: string; guardId: string; guardName: string;
    alertType: string; location: { latitude: number; longitude: number };
  }): Promise<GeofenceAlert> {
    const alert = new this.alertModel({
      ...data,
      geofenceId: new Types.ObjectId(data.geofenceId),
      guardId: new Types.ObjectId(data.guardId),
      timestamp: new Date(),
    });
    return alert.save();
  }

  async getAlerts(geofenceId?: string, acknowledged?: boolean): Promise<GeofenceAlert[]> {
    const query: any = {};
    if (geofenceId) query.geofenceId = new Types.ObjectId(geofenceId);
    if (acknowledged !== undefined) query.acknowledged = acknowledged;
    return this.alertModel.find(query).sort({ timestamp: -1 });
  }

  async acknowledgeAlert(id: string, acknowledgedBy: string): Promise<GeofenceAlert> {
    const alert = await this.alertModel.findByIdAndUpdate(
      id,
      { acknowledged: true, acknowledgedBy, acknowledgedAt: new Date() },
      { new: true },
    );
    if (!alert) throw new NotFoundException(`Alert ${id} not found`);
    return alert;
  }

  async assignGuard(geofenceId: string, guardId: string): Promise<Geofence> {
    const geofence = await this.geofenceModel.findByIdAndUpdate(
      geofenceId,
      { $addToSet: { assignedGuards: new Types.ObjectId(guardId) } },
      { new: true },
    );
    if (!geofence) throw new NotFoundException(`Geofence ${geofenceId} not found`);
    return geofence;
  }

  async removeGuard(geofenceId: string, guardId: string): Promise<Geofence> {
    const geofence = await this.geofenceModel.findByIdAndUpdate(
      geofenceId,
      { $pull: { assignedGuards: new Types.ObjectId(guardId) } },
      { new: true },
    );
    if (!geofence) throw new NotFoundException(`Geofence ${geofenceId} not found`);
    return geofence;
  }
}
