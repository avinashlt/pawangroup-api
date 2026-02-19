import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CheckpointDocument = Checkpoint & Document;
export type CheckpointScanDocument = CheckpointScan & Document;

@Schema()
export class CheckpointLocation {
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
export class Checkpoint {
  @ApiProperty({ description: 'Checkpoint name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Checkpoint type', enum: ['nfc', 'qr', 'beacon'] })
  @Prop({ required: true, enum: ['nfc', 'qr', 'beacon'] })
  type: string;

  @ApiProperty({ description: 'Site ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Site', required: true })
  siteId: Types.ObjectId;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  siteName: string;

  @ApiProperty({ description: 'Checkpoint location' })
  @Prop({ type: CheckpointLocation, required: true })
  location: CheckpointLocation;

  @ApiProperty({ description: 'Is checkpoint active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Required scan frequency in minutes' })
  @Prop({ required: true })
  scanFrequency: number;

  @ApiProperty({ description: 'Last scanned timestamp', required: false })
  @Prop()
  lastScanned?: Date;

  @ApiProperty({ description: 'NFC/QR code value', required: false })
  @Prop()
  codeValue?: string;
}

export const CheckpointSchema = SchemaFactory.createForClass(Checkpoint);

@Schema({ timestamps: true })
export class CheckpointScan {
  @ApiProperty({ description: 'Checkpoint ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Checkpoint', required: true })
  checkpointId: Types.ObjectId;

  @ApiProperty({ description: 'Checkpoint name' })
  @Prop({ required: true })
  checkpointName: string;

  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Scan timestamp' })
  @Prop({ required: true })
  scannedAt: Date;

  @ApiProperty({ description: 'Scan location' })
  @Prop({ type: { latitude: Number, longitude: Number }, required: true })
  location: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Scan status', enum: ['on-time', 'late', 'missed'] })
  @Prop({ required: true, enum: ['on-time', 'late', 'missed'] })
  status: string;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;
}

export const CheckpointScanSchema = SchemaFactory.createForClass(CheckpointScan);

// Indexes
CheckpointSchema.index({ siteId: 1 });
CheckpointScanSchema.index({ checkpointId: 1, scannedAt: -1 });
CheckpointScanSchema.index({ guardId: 1, scannedAt: -1 });
