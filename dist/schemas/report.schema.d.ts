import { Document, Types } from 'mongoose';
export type ReportDocument = Report & Document;
export type ReportConfigDocument = ReportConfig & Document;
export type PerformanceRecordDocument = PerformanceRecord & Document;
export declare class Report {
    name: string;
    type: string;
    siteId?: Types.ObjectId;
    startDate?: string;
    endDate?: string;
    data?: Record<string, any>;
    status: string;
    generatedAt?: Date;
    fileUrl?: string;
}
export declare const ReportSchema: import("mongoose").Schema<Report, import("mongoose").Model<Report, any, any, any, Document<unknown, any, Report, any, {}> & Report & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Report, Document<unknown, {}, import("mongoose").FlatRecord<Report>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Report> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ReportConfig {
    name: string;
    type: string;
    frequency: string;
    recipients: string[];
    filters: Record<string, any>;
    isActive: boolean;
    lastGenerated?: Date;
    createdBy?: Types.ObjectId;
}
export declare const ReportConfigSchema: import("mongoose").Schema<ReportConfig, import("mongoose").Model<ReportConfig, any, any, any, Document<unknown, any, ReportConfig, any, {}> & ReportConfig & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReportConfig, Document<unknown, {}, import("mongoose").FlatRecord<ReportConfig>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ReportConfig> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class PerformanceRecord {
    guardId: Types.ObjectId;
    guardName: string;
    period: string;
    attendanceRate: number;
    punctualityRate: number;
    checkpointComplianceRate: number;
    incidentsReported: number;
    avgResponseTime: number;
    totalWorkHours: number;
    overtimeHours: number;
    lateArrivals: number;
    earlyDepartures: number;
    missedCheckpoints: number;
}
export declare const PerformanceRecordSchema: import("mongoose").Schema<PerformanceRecord, import("mongoose").Model<PerformanceRecord, any, any, any, Document<unknown, any, PerformanceRecord, any, {}> & PerformanceRecord & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PerformanceRecord, Document<unknown, {}, import("mongoose").FlatRecord<PerformanceRecord>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PerformanceRecord> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
