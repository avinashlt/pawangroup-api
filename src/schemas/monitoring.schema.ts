import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Monitoring Session Schema
export type MonitoringDocument = Monitoring & Document;

@Schema({ timestamps: true })
export class Monitoring {
  @ApiProperty({ description: 'Guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Session start time' })
  @Prop({ required: true })
  startTime: Date;

  @ApiProperty({ description: 'Session end time' })
  @Prop()
  endTime?: Date;

  @ApiProperty({ description: 'Session status' })
  @Prop({ required: true, enum: ['active', 'ended'], default: 'active' })
  status: string;

  @ApiProperty({ description: 'Last heartbeat' })
  @Prop()
  lastHeartbeat?: Date;

  @ApiProperty({ description: 'Device ID' })
  @Prop()
  deviceId?: string;
}

export const MonitoringSchema = SchemaFactory.createForClass(Monitoring);
MonitoringSchema.index({ guardId: 1, status: 1 });
MonitoringSchema.index({ siteId: 1, status: 1 });

// Sleep Alert Schema
export type SleepAlertDocument = SleepAlert & Document;

@Schema({ timestamps: true })
export class SleepAlert {
  @ApiProperty({ description: 'Guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Detection timestamp' })
  @Prop({ required: true })
  detectedAt: Date;

  @ApiProperty({ description: 'Duration in seconds' })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({ description: 'Location at detection' })
  @Prop({ type: { latitude: Number, longitude: Number }, required: true })
  location: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Alert status', enum: ['active', 'acknowledged', 'false-positive'] })
  @Prop({
    required: true,
    enum: ['active', 'acknowledged', 'false-positive'],
    default: 'active',
  })
  status: string;

  @ApiProperty({ description: 'Acknowledged by user', required: false })
  @Prop()
  acknowledgedBy?: string;

  @ApiProperty({ description: 'Acknowledgement timestamp', required: false })
  @Prop()
  acknowledgedAt?: Date;

  @ApiProperty({ description: 'Detection method', required: false })
  @Prop()
  detectionMethod?: string;

  @ApiProperty({ description: 'Confidence score', required: false })
  @Prop()
  confidence?: number;

  @ApiProperty({ description: 'Notes', required: false })
  @Prop()
  notes?: string;
}

export const SleepAlertSchema = SchemaFactory.createForClass(SleepAlert);

// Create indexes
SleepAlertSchema.index({ status: 1, detectedAt: -1 });
SleepAlertSchema.index({ guardId: 1, detectedAt: -1 });
SleepAlertSchema.index({ siteId: 1, detectedAt: -1 });

// AI Alert Schema
export type AiAlertDocument = AiAlert & Document;

@Schema({ timestamps: true })
export class AiAlert {
  @ApiProperty({
    description: 'Alert type',
    enum: ['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection'],
  })
  @Prop({
    required: true,
    enum: ['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection'],
  })
  type: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Camera ID' })
  @Prop({ type: Types.ObjectId, ref: 'Camera', required: true })
  cameraId: Types.ObjectId;

  @ApiProperty({ description: 'Camera name' })
  @Prop({ required: true })
  cameraName: string;

  @ApiProperty({ description: 'Detection timestamp' })
  @Prop({ required: true })
  detectedAt: Date;

  @ApiProperty({ description: 'Confidence percentage' })
  @Prop({ required: true })
  confidence: number;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @Prop()
  thumbnail?: string;

  @ApiProperty({ description: 'Video clip URL', required: false })
  @Prop()
  videoClip?: string;

  @ApiProperty({ description: 'Alert status', enum: ['new', 'reviewing', 'confirmed', 'false-positive'] })
  @Prop({
    required: true,
    enum: ['new', 'reviewing', 'confirmed', 'false-positive'],
    default: 'new',
  })
  status: string;

  @ApiProperty({ description: 'Reviewed by user', required: false })
  @Prop()
  reviewedBy?: string;

  @ApiProperty({ description: 'Review timestamp', required: false })
  @Prop()
  reviewedAt?: Date;

  @ApiProperty({ description: 'Detected objects', required: false })
  @Prop({ type: [String] })
  detectedObjects?: string[];

  @ApiProperty({ description: 'Bounding boxes', required: false })
  @Prop({ type: [{ x: Number, y: Number, width: Number, height: Number, label: String }] })
  boundingBoxes?: { x: number; y: number; width: number; height: number; label: string }[];

  @ApiProperty({ description: 'Notes', required: false })
  @Prop()
  notes?: string;
}

export const AiAlertSchema = SchemaFactory.createForClass(AiAlert);

// Create indexes
AiAlertSchema.index({ status: 1, detectedAt: -1 });
AiAlertSchema.index({ siteId: 1, detectedAt: -1 });
AiAlertSchema.index({ cameraId: 1, detectedAt: -1 });
AiAlertSchema.index({ type: 1, status: 1 });
