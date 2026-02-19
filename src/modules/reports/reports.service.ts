import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportDocument, ReportConfig, ReportConfigDocument } from '../../schemas/report.schema';
import { Attendance, AttendanceDocument } from '../../schemas/attendance.schema';
import { Incident, IncidentDocument } from '../../schemas/incident.schema';
import { Guard, GuardDocument } from '../../schemas/guard.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(ReportConfig.name) private configModel: Model<ReportConfigDocument>,
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
    @InjectModel(Incident.name) private incidentModel: Model<IncidentDocument>,
    @InjectModel(Guard.name) private guardModel: Model<GuardDocument>,
  ) {}

  // Reports
  async createReport(data: any): Promise<Report> {
    const report = new this.reportModel({ ...data, generatedAt: new Date(), status: 'generating' });
    return report.save();
  }

  async findReports(type?: string, siteId?: string): Promise<Report[]> {
    const query: any = {};
    if (type) query.type = type;
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    return this.reportModel.find(query).sort({ generatedAt: -1 });
  }

  async findReportById(id: string): Promise<Report> {
    const report = await this.reportModel.findById(id);
    if (!report) throw new NotFoundException(`Report ${id} not found`);
    return report;
  }

  async deleteReport(id: string): Promise<void> {
    const result = await this.reportModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Report ${id} not found`);
  }

  // Report configs
  async createConfig(data: Partial<ReportConfig>): Promise<ReportConfig> {
    const config = new this.configModel(data);
    return config.save();
  }

  async findConfigs(): Promise<ReportConfig[]> { return this.configModel.find(); }

  async updateConfig(id: string, data: Partial<ReportConfig>): Promise<ReportConfig> {
    const config = await this.configModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!config) throw new NotFoundException(`Config ${id} not found`);
    return config;
  }

  async deleteConfig(id: string): Promise<void> {
    const result = await this.configModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Config ${id} not found`);
  }

  // Analytics
  async getGuardPerformance(guardId: string, startDate: string, endDate: string): Promise<any> {
    const guard = await this.guardModel.findById(guardId);
    if (!guard) throw new NotFoundException(`Guard ${guardId} not found`);

    const [attendance, incidents] = await Promise.all([
      this.attendanceModel.find({ guardId: new Types.ObjectId(guardId), date: { $gte: startDate, $lte: endDate } }),
      this.incidentModel.find({ reportedBy: new Types.ObjectId(guardId), timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
    ]);

    const totalShifts = attendance.length;
    const onTimeArrivals = attendance.filter(a => a.checkIn && a.status === 'present').length;
    
    return {
      guardId, guardName: guard.name, period: { startDate, endDate },
      metrics: { totalShifts, onTimeArrivals, onTimeRate: totalShifts ? (onTimeArrivals / totalShifts * 100).toFixed(1) : 0, incidentsReported: incidents.length },
    };
  }

  async getSitePerformance(siteId: string, startDate: string, endDate: string): Promise<any> {
    const [attendance, incidents] = await Promise.all([
      this.attendanceModel.find({ siteId: new Types.ObjectId(siteId), date: { $gte: startDate, $lte: endDate } }),
      this.incidentModel.find({ siteId: new Types.ObjectId(siteId), timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
    ]);

    return {
      siteId, period: { startDate, endDate },
      metrics: { totalAttendance: attendance.length, totalIncidents: incidents.length, incidentsByType: this.groupBy(incidents, 'type') },
    };
  }

  async getDashboardMetrics(startDate: string, endDate: string): Promise<any> {
    const [attendance, incidents, guards] = await Promise.all([
      this.attendanceModel.countDocuments({ date: { $gte: startDate, $lte: endDate } }),
      this.incidentModel.countDocuments({ timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) } }),
      this.guardModel.countDocuments({ status: 'active' }),
    ]);
    return { period: { startDate, endDate }, totalAttendance: attendance, totalIncidents: incidents, activeGuards: guards };
  }

  private groupBy(arr: any[], key: string): Record<string, number> {
    return arr.reduce((acc, item) => { acc[item[key]] = (acc[item[key]] || 0) + 1; return acc; }, {});
  }
}
