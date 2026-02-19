import { Model } from 'mongoose';
import { Monitoring, MonitoringDocument, SleepAlert, SleepAlertDocument, AiAlert, AiAlertDocument } from '../../schemas/monitoring.schema';
export declare class MonitoringService {
    private monitoringModel;
    private sleepAlertModel;
    private aiAlertModel;
    constructor(monitoringModel: Model<MonitoringDocument>, sleepAlertModel: Model<SleepAlertDocument>, aiAlertModel: Model<AiAlertDocument>);
    createSession(data: any): Promise<Monitoring>;
    findSessions(guardId?: string, siteId?: string, status?: string): Promise<Monitoring[]>;
    getActiveSessions(): Promise<Monitoring[]>;
    endSession(id: string): Promise<Monitoring>;
    updateHeartbeat(id: string): Promise<Monitoring>;
    createSleepAlert(data: any): Promise<SleepAlert>;
    findSleepAlerts(guardId?: string, siteId?: string, acknowledged?: boolean): Promise<SleepAlert[]>;
    acknowledgeSleepAlert(id: string, acknowledgedBy: string): Promise<SleepAlert>;
    createAIAlert(data: any): Promise<AiAlert>;
    findAIAlerts(siteId?: string, type?: string, status?: string): Promise<AiAlert[]>;
    updateAIAlertStatus(id: string, status: string, reviewedBy?: string, notes?: string): Promise<AiAlert>;
    getMonitoringMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any>;
}
