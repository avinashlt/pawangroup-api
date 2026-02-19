import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SiteDocument = Site & Document;

@Schema({ timestamps: true })
export class Site {
  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Site address' })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ description: 'Client name' })
  @Prop({ required: true })
  clientName: string;

  @ApiProperty({ description: 'Contact person name', required: false })
  @Prop()
  contactPerson?: string;

  @ApiProperty({ description: 'Contact phone number', required: false })
  @Prop()
  contactPhone?: string;

  @ApiProperty({ description: 'Contact email', required: false })
  @Prop()
  contactEmail?: string;

  @ApiProperty({ description: 'Is site active' })
  @Prop({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Site location coordinates', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  location?: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Number of required guards' })
  @Prop({ default: 1 })
  requiredGuards: number;

  @ApiProperty({ description: 'Operating hours', required: false })
  @Prop()
  operatingHours?: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
