import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GeofenceDocument = Geofence & Document;
export type GeofenceAlertDocument = GeofenceAlert & Document;

@Schema({ timestamps: true })
export class Geofence {
  @ApiProperty({ description: 'Geofence name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Site ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Geofence type', enum: ['circle', 'polygon'] })
  @Prop({ required: true, enum: ['circle', 'polygon'] })
  type: string;

  @ApiProperty({ description: 'Center coordinates for circle type', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  center?: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Radius in meters for circle type', required: false })
  @Prop()
  radius?: number;

  @ApiProperty({ description: 'Polygon coordinates', required: false })
  @Prop({ type: [{ latitude: Number, longitude: Number }] })
  polygon?: { latitude: number; longitude: number }[];

  @ApiProperty({ description: 'Is geofence active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Alert on exit' })
  @Prop({ default: true })
  alertOnExit: boolean;

  @ApiProperty({ description: 'Alert on entry' })
  @Prop({ default: false })
  alertOnEntry: boolean;

  @ApiProperty({ description: 'Assigned guard IDs' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Guard' }], default: [] })
  assignedGuards: Types.ObjectId[];
}

export const GeofenceSchema = SchemaFactory.createForClass(Geofence);

@Schema({ timestamps: true })
export class GeofenceAlert {
  @ApiProperty({ description: 'Geofence ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Geofence', required: true })
  geofenceId: Types.ObjectId;

  @ApiProperty({ description: 'Geofence name' })
  @Prop({ required: true })
  geofenceName: string;

  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Alert type', enum: ['entry', 'exit'] })
  @Prop({ required: true, enum: ['entry', 'exit'] })
  alertType: string;

  @ApiProperty({ description: 'Alert timestamp' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Location at time of alert' })
  @Prop({ type: { latitude: Number, longitude: Number }, required: true })
  location: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Is alert acknowledged' })
  @Prop({ default: false })
  acknowledged: boolean;

  @ApiProperty({ description: 'Acknowledged by user', required: false })
  @Prop()
  acknowledgedBy?: string;

  @ApiProperty({ description: 'Acknowledged timestamp', required: false })
  @Prop()
  acknowledgedAt?: Date;
}

export const GeofenceAlertSchema = SchemaFactory.createForClass(GeofenceAlert);

// Indexes
GeofenceSchema.index({ siteId: 1 });
GeofenceAlertSchema.index({ geofenceId: 1, timestamp: -1 });
GeofenceAlertSchema.index({ acknowledged: 1 });
