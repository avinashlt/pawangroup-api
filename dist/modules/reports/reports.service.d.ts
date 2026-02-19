import { Model } from 'mongoose';
import { Report, ReportDocument, ReportConfig, ReportConfigDocument } from '../../schemas/report.schema';
import { AttendanceDocument } from '../../schemas/attendance.schema';
import { IncidentDocument } from '../../schemas/incident.schema';
import { GuardDocument } from '../../schemas/guard.schema';
export declare class ReportsService {
    private reportModel;
    private configModel;
    private attendanceModel;
    private incidentModel;
    private guardModel;
    constructor(reportModel: Model<ReportDocument>, configModel: Model<ReportConfigDocument>, attendanceModel: Model<AttendanceDocument>, incidentModel: Model<IncidentDocument>, guardModel: Model<GuardDocument>);
    createReport(data: any): Promise<Report>;
    findReports(type?: string, siteId?: string): Promise<Report[]>;
    findReportById(id: string): Promise<Report>;
    deleteReport(id: string): Promise<void>;
    createConfig(data: Partial<ReportConfig>): Promise<ReportConfig>;
    findConfigs(): Promise<ReportConfig[]>;
    updateConfig(id: string, data: Partial<ReportConfig>): Promise<ReportConfig>;
    deleteConfig(id: string): Promise<void>;
    getGuardPerformance(guardId: string, startDate: string, endDate: string): Promise<any>;
    getSitePerformance(siteId: string, startDate: string, endDate: string): Promise<any>;
    getDashboardMetrics(startDate: string, endDate: string): Promise<any>;
    private groupBy;
}
