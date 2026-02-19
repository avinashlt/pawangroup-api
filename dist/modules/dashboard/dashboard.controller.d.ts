import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<import("./dashboard.service").DashboardStats>;
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
        sosAlerts: import("../../schemas/sos-alert.schema").SosAlert[];
        sleepAlerts: import("../../schemas/monitoring.schema").SleepAlert[];
        aiAlerts: import("../../schemas/monitoring.schema").AiAlert[];
        incidents: import("../../schemas/incident.schema").Incident[];
    }>;
}
