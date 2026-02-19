import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @ApiProperty({ description: 'Notification type', enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'] })
  @Prop({ required: true, enum: ['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'] })
  type: string;

  @ApiProperty({ description: 'Notification title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Notification message' })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ description: 'Notification timestamp' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Is notification read' })
  @Prop({ default: false })
  isRead: boolean;

  @ApiProperty({ description: 'Priority level', enum: ['low', 'medium', 'high', 'critical'] })
  @Prop({ required: true, enum: ['low', 'medium', 'high', 'critical'], default: 'low' })
  priority: string;

  @ApiProperty({ description: 'Related entity ID', required: false })
  @Prop()
  relatedId?: string;

  @ApiProperty({ description: 'Related entity type', required: false })
  @Prop()
  relatedType?: string;

  @ApiProperty({ description: 'Target user ID', required: false })
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId?: Types.ObjectId;

  @ApiProperty({ description: 'Target user role (for broadcast)', required: false })
  @Prop()
  targetRole?: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

// Indexes
NotificationSchema.index({ userId: 1, isRead: 1, timestamp: -1 });
NotificationSchema.index({ timestamp: -1 });
