import { ReportsService } from './reports.service';
import { CreateReportDto, CreateConfigDto, UpdateConfigDto } from './dto/reports.dto';
export declare class ReportsController {
    private readonly service;
    constructor(service: ReportsService);
    createReport(dto: CreateReportDto): Promise<import("../../schemas/report.schema").Report>;
    findReports(type?: string, siteId?: string): Promise<import("../../schemas/report.schema").Report[]>;
    findConfigs(): Promise<import("../../schemas/report.schema").ReportConfig[]>;
    createConfig(dto: CreateConfigDto): Promise<import("../../schemas/report.schema").ReportConfig>;
    updateConfig(id: string, dto: UpdateConfigDto): Promise<import("../../schemas/report.schema").ReportConfig>;
    deleteConfig(id: string): Promise<{
        message: string;
    }>;
    getGuardPerformance(guardId: string, startDate: string, endDate: string): Promise<any>;
    getSitePerformance(siteId: string, startDate: string, endDate: string): Promise<any>;
    getDashboardMetrics(startDate: string, endDate: string): Promise<any>;
    findReportById(id: string): Promise<import("../../schemas/report.schema").Report>;
    deleteReport(id: string): Promise<{
        message: string;
    }>;
}
