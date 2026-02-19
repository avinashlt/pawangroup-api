import { MonitoringService } from './monitoring.service';
import { CreateSessionDto, CreateSleepAlertDto, AcknowledgeAlertDto, CreateAIAlertDto, UpdateAIAlertDto } from './dto/monitoring.dto';
export declare class MonitoringController {
    private readonly service;
    constructor(service: MonitoringService);
    createSession(dto: CreateSessionDto): Promise<import("../../schemas/monitoring.schema").Monitoring>;
    findSessions(guardId?: string, siteId?: string, status?: string): Promise<import("../../schemas/monitoring.schema").Monitoring[]>;
    getActiveSessions(): Promise<import("../../schemas/monitoring.schema").Monitoring[]>;
    endSession(id: string): Promise<import("../../schemas/monitoring.schema").Monitoring>;
    updateHeartbeat(id: string): Promise<import("../../schemas/monitoring.schema").Monitoring>;
    createSleepAlert(dto: CreateSleepAlertDto): Promise<import("../../schemas/monitoring.schema").SleepAlert>;
    findSleepAlerts(guardId?: string, siteId?: string, acknowledged?: boolean): Promise<import("../../schemas/monitoring.schema").SleepAlert[]>;
    acknowledgeSleepAlert(id: string, dto: AcknowledgeAlertDto): Promise<import("../../schemas/monitoring.schema").SleepAlert>;
    createAIAlert(dto: CreateAIAlertDto): Promise<import("../../schemas/monitoring.schema").AiAlert>;
    findAIAlerts(siteId?: string, type?: string, status?: string): Promise<import("../../schemas/monitoring.schema").AiAlert[]>;
    updateAIAlertStatus(id: string, dto: UpdateAIAlertDto): Promise<import("../../schemas/monitoring.schema").AiAlert>;
    getMonitoringMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any>;
}
