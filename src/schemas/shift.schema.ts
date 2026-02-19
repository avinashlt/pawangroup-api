import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ShiftDocument = ScheduledShift & Document;
export type ShiftTemplateDocument = ShiftTemplate & Document;
export type ScheduledShiftDocument = ScheduledShift & Document;
export type ShiftSwapRequestDocument = ShiftSwapRequest & Document;
export type TimeOffRequestDocument = TimeOffRequest & Document;

@Schema({ timestamps: true })
export class ShiftTemplate {
  @ApiProperty({ description: 'Template name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Start time (HH:mm)' })
  @Prop({ required: true })
  startTime: string;

  @ApiProperty({ description: 'End time (HH:mm)' })
  @Prop({ required: true })
  endTime: string;

  @ApiProperty({ description: 'Break duration in minutes' })
  @Prop({ default: 0 })
  breakDuration: number;

  @ApiProperty({ description: 'Days of week (0-6, Sunday-Saturday)' })
  @Prop({ type: [Number], default: [] })
  daysOfWeek: number[];

  @ApiProperty({ description: 'Site ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Number of required guards' })
  @Prop({ default: 1 })
  requiredGuards: number;

  @ApiProperty({ description: 'Is template active' })
  @Prop({ default: true })
  isActive: boolean;
}

export const ShiftTemplateSchema = SchemaFactory.createForClass(ShiftTemplate);

@Schema({ timestamps: true })
export class ScheduledShift {
  @ApiProperty({ description: 'Template ID reference', required: false })
  @Prop({ type: Types.ObjectId, ref: 'ShiftTemplate' })
  templateId?: Types.ObjectId;

  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Site ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Shift date (YYYY-MM-DD)' })
  @Prop({ required: true })
  date: string;

  @ApiProperty({ description: 'Start time (HH:mm)' })
  @Prop({ required: true })
  startTime: string;

  @ApiProperty({ description: 'End time (HH:mm)' })
  @Prop({ required: true })
  endTime: string;

  @ApiProperty({ description: 'Shift status', enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'] })
  @Prop({ required: true, enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' })
  status: string;

  @ApiProperty({ description: 'Check-in time', required: false })
  @Prop()
  checkInTime?: string;

  @ApiProperty({ description: 'Check-out time', required: false })
  @Prop()
  checkOutTime?: string;

  @ApiProperty({ description: 'Check-in location', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  checkInLocation?: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Check-out location', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  checkOutLocation?: { latitude: number; longitude: number };
}

export const ScheduledShiftSchema = SchemaFactory.createForClass(ScheduledShift);

@Schema({ timestamps: true })
export class ShiftSwapRequest {
  @ApiProperty({ description: 'Requester guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  requesterId: Types.ObjectId;

  @ApiProperty({ description: 'Requester name' })
  @Prop({ required: true })
  requesterName: string;

  @ApiProperty({ description: 'Target guard ID' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  targetGuardId: Types.ObjectId;

  @ApiProperty({ description: 'Target guard name' })
  @Prop({ required: true })
  targetGuardName: string;

  @ApiProperty({ description: 'Original shift ID' })
  @Prop({ type: Types.ObjectId, ref: 'ScheduledShift', required: true })
  originalShiftId: Types.ObjectId;

  @ApiProperty({ description: 'Swap shift ID' })
  @Prop({ type: Types.ObjectId, ref: 'ScheduledShift', required: true })
  swapShiftId: Types.ObjectId;

  @ApiProperty({ description: 'Original shift date' })
  @Prop({ required: true })
  originalDate: string;

  @ApiProperty({ description: 'Swap shift date' })
  @Prop({ required: true })
  swapDate: string;

  @ApiProperty({ description: 'Reason for swap request' })
  @Prop({ required: true })
  reason: string;

  @ApiProperty({ description: 'Request status', enum: ['pending', 'approved', 'rejected'] })
  @Prop({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @ApiProperty({ description: 'Request timestamp' })
  @Prop({ required: true })
  requestedAt: Date;

  @ApiProperty({ description: 'Processed by user', required: false })
  @Prop()
  processedBy?: string;

  @ApiProperty({ description: 'Processed timestamp', required: false })
  @Prop()
  processedAt?: Date;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;
}

export const ShiftSwapRequestSchema = SchemaFactory.createForClass(ShiftSwapRequest);

@Schema({ timestamps: true })
export class TimeOffRequest {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Time-off type', enum: ['sick', 'vacation', 'personal', 'emergency'] })
  @Prop({ required: true, enum: ['sick', 'vacation', 'personal', 'emergency'] })
  type: string;

  @ApiProperty({ description: 'Start date (YYYY-MM-DD)' })
  @Prop({ required: true })
  startDate: string;

  @ApiProperty({ description: 'End date (YYYY-MM-DD)' })
  @Prop({ required: true })
  endDate: string;

  @ApiProperty({ description: 'Reason for time-off' })
  @Prop({ required: true })
  reason: string;

  @ApiProperty({ description: 'Request status', enum: ['pending', 'approved', 'rejected'] })
  @Prop({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;

  @ApiProperty({ description: 'Request timestamp' })
  @Prop({ required: true })
  requestedAt: Date;

  @ApiProperty({ description: 'Processed by user', required: false })
  @Prop()
  processedBy?: string;

  @ApiProperty({ description: 'Processed timestamp', required: false })
  @Prop()
  processedAt?: Date;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;
}

export const TimeOffRequestSchema = SchemaFactory.createForClass(TimeOffRequest);

// Shift is an alias for ScheduledShift for module compatibility
export { ScheduledShift as Shift };
export { ScheduledShiftSchema as ShiftSchema };

// Indexes
ShiftTemplateSchema.index({ siteId: 1 });
ScheduledShiftSchema.index({ guardId: 1, date: 1 });
ScheduledShiftSchema.index({ siteId: 1, date: 1 });
ShiftSwapRequestSchema.index({ status: 1, requestedAt: -1 });
TimeOffRequestSchema.index({ status: 1, requestedAt: -1 });
