import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guard, GuardDocument } from '../../schemas/guard.schema';
import { Attendance, AttendanceDocument } from '../../schemas/attendance.schema';
import { Incident, IncidentDocument } from '../../schemas/incident.schema';
import { SosAlert, SosAlertDocument } from '../../schemas/sos-alert.schema';
import { SleepAlert, SleepAlertDocument, AiAlert, AiAlertDocument } from '../../schemas/monitoring.schema';

export interface DashboardStats {
  totalGuards: number;
  activeGuards: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeave: number;
  activeIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: number;
  activeSOSAlerts: number;
  sleepAlerts: number;
  aiAlerts: number;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Guard.name) private guardModel: Model<GuardDocument>,
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
    @InjectModel(Incident.name) private incidentModel: Model<IncidentDocument>,
    @InjectModel(SosAlert.name) private sosAlertModel: Model<SosAlertDocument>,
    @InjectModel(SleepAlert.name) private sleepAlertModel: Model<SleepAlertDocument>,
    @InjectModel(AiAlert.name) private aiAlertModel: Model<AiAlertDocument>,
  ) {}

  async getStats(): Promise<DashboardStats> {
    const today = new Date().toISOString().split('T')[0];

    const [
      totalGuards,
      activeGuards,
      onLeaveGuards,
      todayAttendance,
      activeIncidents,
      resolvedIncidents,
      activeSOSAlerts,
      activeSleepAlerts,
      activeAiAlerts,
    ] = await Promise.all([
      this.guardModel.countDocuments(),
      this.guardModel.countDocuments({ status: 'active' }),
      this.guardModel.countDocuments({ status: 'on-leave' }),
      this.attendanceModel.find({ date: today }),
      this.incidentModel.countDocuments({ status: { $in: ['new', 'reviewing', 'escalated'] } }),
      this.incidentModel.countDocuments({ status: 'resolved' }),
      this.sosAlertModel.countDocuments({ status: { $in: ['active', 'responding'] } }),
      this.sleepAlertModel.countDocuments({ status: 'active' }),
      this.aiAlertModel.countDocuments({ status: { $in: ['new', 'reviewing'] } }),
    ]);

    const presentToday = todayAttendance.filter(a => a.status === 'present').length;
    const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
    const lateToday = todayAttendance.filter(a => a.status === 'late').length;

    // Calculate average response time from resolved incidents (in minutes)
    const resolvedIncidentsData = await this.incidentModel.find({
      status: 'resolved',
      resolvedAt: { $exists: true },
    }).limit(100);

    let averageResponseTime = 0;
    if (resolvedIncidentsData.length > 0) {
      const totalResponseTime = resolvedIncidentsData.reduce((sum, incident) => {
        if (incident.resolvedAt && incident.timestamp) {
          const responseTime = (new Date(incident.resolvedAt).getTime() - new Date(incident.timestamp).getTime()) / (1000 * 60);
          return sum + responseTime;
        }
        return sum;
      }, 0);
      averageResponseTime = Math.round(totalResponseTime / resolvedIncidentsData.length);
    }

    return {
      totalGuards,
      activeGuards,
      presentToday,
      absentToday,
      lateToday,
      onLeave: onLeaveGuards,
      activeIncidents,
      resolvedIncidents,
      averageResponseTime,
      activeSOSAlerts,
      sleepAlerts: activeSleepAlerts,
      aiAlerts: activeAiAlerts,
    };
  }

  async getAttendanceTrend(days: number = 7): Promise<{ date: string; present: number; absent: number; late: number }[]> {
    const trend: { date: string; present: number; absent: number; late: number }[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const attendance = await this.attendanceModel.find({ date: dateStr });
      
      trend.push({
        date: dateStr,
        present: attendance.filter(a => a.status === 'present').length,
        absent: attendance.filter(a => a.status === 'absent').length,
        late: attendance.filter(a => a.status === 'late').length,
      });
    }

    return trend;
  }

  async getIncidentTrend(days: number = 7): Promise<{ date: string; count: number; bySeverity: Record<string, number> }[]> {
    const trend: { date: string; count: number; bySeverity: Record<string, number> }[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - i);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(23, 59, 59, 999);

      const incidents = await this.incidentModel.find({
        timestamp: { $gte: startDate, $lte: endDate },
      });

      const bySeverity: Record<string, number> = {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      };

      incidents.forEach(incident => {
        bySeverity[incident.severity] = (bySeverity[incident.severity] || 0) + 1;
      });

      trend.push({
        date: startDate.toISOString().split('T')[0],
        count: incidents.length,
        bySeverity,
      });
    }

    return trend;
  }

  async getRecentAlerts(limit: number = 10): Promise<{
    sosAlerts: SosAlert[];
    sleepAlerts: SleepAlert[];
    aiAlerts: AiAlert[];
    incidents: Incident[];
  }> {
    const [sosAlerts, sleepAlerts, aiAlerts, incidents] = await Promise.all([
      this.sosAlertModel.find().sort({ timestamp: -1 }).limit(limit),
      this.sleepAlertModel.find().sort({ detectedAt: -1 }).limit(limit),
      this.aiAlertModel.find().sort({ detectedAt: -1 }).limit(limit),
      this.incidentModel.find().sort({ timestamp: -1 }).limit(limit),
    ]);

    return { sosAlerts, sleepAlerts, aiAlerts, incidents };
  }
}
