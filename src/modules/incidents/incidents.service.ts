import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Incident, IncidentDocument } from '../../schemas/incident.schema';
import { CreateIncidentDto, UpdateIncidentDto, IncidentFilterDto } from './dto/incidents.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectModel(Incident.name) private incidentModel: Model<IncidentDocument>,
  ) {}

  async create(createDto: CreateIncidentDto): Promise<Incident> {
    const incident = new this.incidentModel({
      ...createDto,
      guardId: new Types.ObjectId(createDto.guardId),
      timestamp: createDto.timestamp ? new Date(createDto.timestamp) : new Date(),
    });
    return incident.save();
  }

  async findAll(filterDto?: IncidentFilterDto): Promise<Incident[]> {
    const query: any = {};

    if (filterDto) {
      if (filterDto.startDate && filterDto.endDate) {
        query.timestamp = {
          $gte: new Date(filterDto.startDate),
          $lte: new Date(filterDto.endDate),
        };
      } else if (filterDto.startDate) {
        query.timestamp = { $gte: new Date(filterDto.startDate) };
      } else if (filterDto.endDate) {
        query.timestamp = { $lte: new Date(filterDto.endDate) };
      }
      if (filterDto.guardId) query.guardId = new Types.ObjectId(filterDto.guardId);
      if (filterDto.severity) query.severity = filterDto.severity;
      if (filterDto.status) query.status = filterDto.status;
      if (filterDto.site) query.site = { $regex: filterDto.site, $options: 'i' };
    }

    return this.incidentModel.find(query).sort({ timestamp: -1 });
  }

  async findOne(id: string): Promise<Incident> {
    const incident = await this.incidentModel.findById(id);
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async update(id: string, updateDto: UpdateIncidentDto): Promise<Incident> {
    const incident = await this.incidentModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true },
    );
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async updateStatus(id: string, status: string, resolvedBy?: string, notes?: string): Promise<Incident> {
    const updateData: any = { status };
    
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
      if (resolvedBy) updateData.resolvedBy = resolvedBy;
    }
    
    if (notes) updateData.notes = notes;

    const incident = await this.incidentModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );
    
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async addMedia(id: string, media: any): Promise<Incident> {
    const incident = await this.incidentModel.findByIdAndUpdate(
      id,
      { $push: { media: { ...media, uploadedAt: new Date() } } },
      { new: true },
    );
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async remove(id: string): Promise<void> {
    const result = await this.incidentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
  }

  async getActiveIncidents(): Promise<Incident[]> {
    return this.incidentModel.find({
      status: { $in: ['new', 'reviewing', 'escalated'] },
    }).sort({ timestamp: -1 });
  }

  async getRecentIncidents(limit: number = 10): Promise<Incident[]> {
    return this.incidentModel.find().sort({ timestamp: -1 }).limit(limit);
  }

  async getIncidentsBySeverity(severity: string): Promise<Incident[]> {
    return this.incidentModel.find({ severity }).sort({ timestamp: -1 });
  }

  async getIncidentsByGuard(guardId: string): Promise<Incident[]> {
    return this.incidentModel.find({
      guardId: new Types.ObjectId(guardId),
    }).sort({ timestamp: -1 });
  }

  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    bySeverity: Record<string, number>;
  }> {
    const [total, statusStats, severityStats] = await Promise.all([
      this.incidentModel.countDocuments(),
      this.incidentModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      this.incidentModel.aggregate([
        { $group: { _id: '$severity', count: { $sum: 1 } } },
      ]),
    ]);

    const byStatus: Record<string, number> = {};
    statusStats.forEach(s => { byStatus[s._id] = s.count; });

    const bySeverity: Record<string, number> = {};
    severityStats.forEach(s => { bySeverity[s._id] = s.count; });

    return { total, byStatus, bySeverity };
  }

  async getStats() {
    return this.getStatistics();
  }
}
