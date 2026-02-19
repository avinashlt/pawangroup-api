import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ReportDocument = Report & Document;
export type ReportConfigDocument = ReportConfig & Document;
export type PerformanceRecordDocument = PerformanceRecord & Document;

@Schema({ timestamps: true })
export class Report {
  @ApiProperty({ description: 'Report name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Report type' })
  @Prop({ required: true })
  type: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site' })
  siteId?: Types.ObjectId;

  @ApiProperty({ description: 'Start date' })
  @Prop()
  startDate?: string;

  @ApiProperty({ description: 'End date' })
  @Prop()
  endDate?: string;

  @ApiProperty({ description: 'Report data' })
  @Prop({ type: Object })
  data?: Record<string, any>;

  @ApiProperty({ description: 'Report status' })
  @Prop({ default: 'generating', enum: ['generating', 'completed', 'failed'] })
  status: string;

  @ApiProperty({ description: 'Generated at' })
  @Prop()
  generatedAt?: Date;

  @ApiProperty({ description: 'File URL' })
  @Prop()
  fileUrl?: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
ReportSchema.index({ type: 1, generatedAt: -1 });

@Schema({ timestamps: true })
export class ReportConfig {
  @ApiProperty({ description: 'Report name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Report type', enum: ['attendance', 'incidents', 'patrol', 'performance', 'compliance', 'custom'] })
  @Prop({ required: true, enum: ['attendance', 'incidents', 'patrol', 'performance', 'compliance', 'custom'] })
  type: string;

  @ApiProperty({ description: 'Report frequency', enum: ['daily', 'weekly', 'monthly', 'custom'] })
  @Prop({ required: true, enum: ['daily', 'weekly', 'monthly', 'custom'] })
  frequency: string;

  @ApiProperty({ description: 'Email recipients' })
  @Prop({ type: [String], default: [] })
  recipients: string[];

  @ApiProperty({ description: 'Report filters' })
  @Prop({ type: Object, default: {} })
  filters: Record<string, any>;

  @ApiProperty({ description: 'Is report active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Last generated timestamp', required: false })
  @Prop()
  lastGenerated?: Date;

  @ApiProperty({ description: 'Created by user ID' })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy?: Types.ObjectId;
}

export const ReportConfigSchema = SchemaFactory.createForClass(ReportConfig);

@Schema({ timestamps: true })
export class PerformanceRecord {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Period (YYYY-MM or YYYY-WW)' })
  @Prop({ required: true })
  period: string;

  @ApiProperty({ description: 'Attendance rate (%)' })
  @Prop({ default: 0 })
  attendanceRate: number;

  @ApiProperty({ description: 'Punctuality rate (%)' })
  @Prop({ default: 0 })
  punctualityRate: number;

  @ApiProperty({ description: 'Checkpoint compliance rate (%)' })
  @Prop({ default: 0 })
  checkpointComplianceRate: number;

  @ApiProperty({ description: 'Number of incidents reported' })
  @Prop({ default: 0 })
  incidentsReported: number;

  @ApiProperty({ description: 'Average response time in minutes' })
  @Prop({ default: 0 })
  avgResponseTime: number;

  @ApiProperty({ description: 'Total work hours' })
  @Prop({ default: 0 })
  totalWorkHours: number;

  @ApiProperty({ description: 'Overtime hours' })
  @Prop({ default: 0 })
  overtimeHours: number;

  @ApiProperty({ description: 'Number of late arrivals' })
  @Prop({ default: 0 })
  lateArrivals: number;

  @ApiProperty({ description: 'Number of early departures' })
  @Prop({ default: 0 })
  earlyDepartures: number;

  @ApiProperty({ description: 'Number of missed checkpoints' })
  @Prop({ default: 0 })
  missedCheckpoints: number;
}

export const PerformanceRecordSchema = SchemaFactory.createForClass(PerformanceRecord);

// Indexes
ReportConfigSchema.index({ type: 1, isActive: 1 });
PerformanceRecordSchema.index({ guardId: 1, period: 1 }, { unique: true });
