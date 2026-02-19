import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type IncidentDocument = Incident & Document;

@Schema()
export class IncidentMedia {
  @ApiProperty({ description: 'Media type', enum: ['image', 'video'] })
  @Prop({ required: true, enum: ['image', 'video'] })
  type: string;

  @ApiProperty({ description: 'Media URL' })
  @Prop({ required: true })
  url: string;

  @ApiProperty({ description: 'Thumbnail URL', required: false })
  @Prop()
  thumbnail?: string;

  @ApiProperty({ description: 'Upload timestamp' })
  @Prop({ required: true })
  uploadedAt: Date;

  @ApiProperty({ description: 'File size in bytes', required: false })
  @Prop()
  size?: number;

  @ApiProperty({ description: 'Duration in seconds (for videos)', required: false })
  @Prop()
  duration?: number;
}

@Schema()
export class IncidentLocation {
  @ApiProperty({ description: 'Latitude' })
  @Prop({ required: true })
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @Prop({ required: true })
  longitude: number;

  @ApiProperty({ description: 'Address', required: false })
  @Prop()
  address?: string;
}

@Schema({ timestamps: true })
export class Incident {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Incident title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Incident description' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Severity level', enum: ['low', 'medium', 'high', 'critical'] })
  @Prop({ required: true, enum: ['low', 'medium', 'high', 'critical'] })
  severity: string;

  @ApiProperty({ description: 'Incident timestamp' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Incident location' })
  @Prop({ type: IncidentLocation, required: true })
  location: IncidentLocation;

  @ApiProperty({ description: 'Media attachments', type: [IncidentMedia] })
  @Prop({ type: [IncidentMedia], default: [] })
  media: IncidentMedia[];

  @ApiProperty({ description: 'Incident status', enum: ['new', 'reviewing', 'resolved', 'escalated'] })
  @Prop({ required: true, enum: ['new', 'reviewing', 'resolved', 'escalated'], default: 'new' })
  status: string;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  site: string;

  @ApiProperty({ description: 'Resolved by user', required: false })
  @Prop()
  resolvedBy?: string;

  @ApiProperty({ description: 'Resolution timestamp', required: false })
  @Prop()
  resolvedAt?: Date;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);

// Create indexes
IncidentSchema.index({ site: 1, timestamp: -1 });
IncidentSchema.index({ status: 1 });
IncidentSchema.index({ severity: 1 });
