import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Latitude' })
  @Prop({ required: true })
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @Prop({ required: true })
  longitude: number;

  @ApiProperty({ description: 'Timestamp of location update' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Address', required: false })
  @Prop()
  address?: string;

  @ApiProperty({ description: 'Is guard currently active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Accuracy in meters', required: false })
  @Prop()
  accuracy?: number;

  @ApiProperty({ description: 'Battery level percentage', required: false })
  @Prop()
  batteryLevel?: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

// Create indexes for efficient queries
LocationSchema.index({ guardId: 1, timestamp: -1 });
LocationSchema.index({ timestamp: -1 });
// Geospatial index for location-based queries
LocationSchema.index({ latitude: 1, longitude: 1 });
