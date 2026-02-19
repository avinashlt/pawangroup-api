import { Model } from 'mongoose';
import { GuardDocument } from '../../schemas/guard.schema';
import { AttendanceDocument } from '../../schemas/attendance.schema';
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
export declare class DashboardService {
    private guardModel;
    private attendanceModel;
    private incidentModel;
    private sosAlertModel;
    private sleepAlertModel;
    private aiAlertModel;
    constructor(guardModel: Model<GuardDocument>, attendanceModel: Model<AttendanceDocument>, incidentModel: Model<IncidentDocument>, sosAlertModel: Model<SosAlertDocument>, sleepAlertModel: Model<SleepAlertDocument>, aiAlertModel: Model<AiAlertDocument>);
    getStats(): Promise<DashboardStats>;
    getAttendanceTrend(days?: number): Promise<{
        date: string;
        present: number;
        absent: number;
        late: number;
    }[]>;
    getIncidentTrend(days?: number): Promise<{
        date: string;
        count: number;
        bySeverity: Record<string, number>;
    }[]>;
    getRecentAlerts(limit?: number): Promise<{
        sosAlerts: SosAlert[];
        sleepAlerts: SleepAlert[];
        aiAlerts: AiAlert[];
        incidents: Incident[];
    }>;
}
