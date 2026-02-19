import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SosAlertDocument = SosAlert & Document;

@Schema({ timestamps: true })
export class SosAlert {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Alert timestamp' })
  @Prop({ required: true })
  timestamp: Date;

  @ApiProperty({ description: 'Alert location' })
  @Prop({ type: { latitude: Number, longitude: Number, address: String }, required: true })
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };

  @ApiProperty({ description: 'Alert status', enum: ['active', 'responding', 'resolved', 'false-alarm'] })
  @Prop({ required: true, enum: ['active', 'responding', 'resolved', 'false-alarm'], default: 'active' })
  status: string;

  @ApiProperty({ description: 'Priority level (always critical for SOS)' })
  @Prop({ default: 'critical' })
  priority: string;

  @ApiProperty({ description: 'Responder user ID', required: false })
  @Prop()
  respondedBy?: string;

  @ApiProperty({ description: 'Response timestamp', required: false })
  @Prop()
  respondedAt?: Date;

  @ApiProperty({ description: 'Resolution timestamp', required: false })
  @Prop()
  resolvedAt?: Date;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Site ID reference', required: false })
  @Prop({ type: Types.ObjectId, ref: 'Site' })
  siteId?: Types.ObjectId;

  @ApiProperty({ description: 'Site name', required: false })
  @Prop()
  siteName?: string;
}

export const SosAlertSchema = SchemaFactory.createForClass(SosAlert);

// Indexes
SosAlertSchema.index({ status: 1, timestamp: -1 });
SosAlertSchema.index({ guardId: 1, timestamp: -1 });
