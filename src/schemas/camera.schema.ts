import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CameraDocument = Camera & Document;

@Schema({ timestamps: true })
export class Camera {
  @ApiProperty({ description: 'Camera name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Site ID' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Camera location description' })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ description: 'Camera type', enum: ['indoor', 'outdoor', 'ptz'] })
  @Prop({ required: true, enum: ['indoor', 'outdoor', 'ptz'] })
  type: string;

  @ApiProperty({ description: 'Is camera online' })
  @Prop({ default: true })
  isOnline: boolean;

  @ApiProperty({ description: 'Camera status' })
  @Prop({ default: 'online', enum: ['online', 'offline', 'maintenance', 'error'] })
  status: string;

  @ApiProperty({ description: 'Is recording enabled' })
  @Prop({ default: false })
  isRecording: boolean;

  @ApiProperty({ description: 'Is AI detection enabled' })
  @Prop({ default: false })
  aiEnabled: boolean;

  @ApiProperty({ description: 'Last seen timestamp' })
  @Prop({ required: true })
  lastSeen: Date;

  @ApiProperty({ description: 'Stream URL', required: false })
  @Prop()
  streamUrl?: string;

  @ApiProperty({ description: 'IP address', required: false })
  @Prop()
  ipAddress?: string;

  @ApiProperty({ description: 'Resolution', required: false })
  @Prop()
  resolution?: string;

  @ApiProperty({ description: 'Manufacturer', required: false })
  @Prop()
  manufacturer?: string;

  @ApiProperty({ description: 'Model', required: false })
  @Prop()
  model?: string;

  @ApiProperty({ description: 'Recording enabled' })
  @Prop({ default: true })
  recordingEnabled: boolean;

  @ApiProperty({ description: 'Motion detection enabled' })
  @Prop({ default: false })
  motionDetectionEnabled: boolean;
}

export const CameraSchema = SchemaFactory.createForClass(Camera);

// Create indexes
CameraSchema.index({ siteId: 1 });
CameraSchema.index({ isOnline: 1 });
CameraSchema.index({ aiEnabled: 1 });
