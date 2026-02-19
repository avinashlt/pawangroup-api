import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GuardDocument = Guard & Document;

@Schema({ timestamps: true })
export class Guard {
  @ApiProperty({ description: 'Full name of the guard' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Employee ID' })
  @Prop({ required: true, unique: true })
  employeeId: string;

  @ApiProperty({ description: 'Phone number' })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ description: 'Photo URL', required: false })
  @Prop()
  photo?: string;

  @ApiProperty({ description: 'Assigned site name' })
  @Prop({ required: true })
  assignedSite: string;

  @ApiProperty({ description: 'Shift type', enum: ['morning', 'evening', 'night'] })
  @Prop({ required: true, enum: ['morning', 'evening', 'night'] })
  shift: string;

  @ApiProperty({ description: 'Guard status', enum: ['active', 'inactive', 'on-leave'] })
  @Prop({ required: true, enum: ['active', 'inactive', 'on-leave'], default: 'active' })
  status: string;

  @ApiProperty({ description: 'Email address', required: false })
  @Prop()
  email?: string;

  @ApiProperty({ description: 'Date of joining' })
  @Prop()
  dateOfJoining?: Date;

  @ApiProperty({ description: 'Emergency contact', required: false })
  @Prop()
  emergencyContact?: string;

  @ApiProperty({ description: 'Address', required: false })
  @Prop()
  address?: string;
}

export const GuardSchema = SchemaFactory.createForClass(Guard);
