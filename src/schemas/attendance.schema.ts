import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @ApiProperty({ description: 'Guard ID reference' })
  @Prop({ type: Types.ObjectId, ref: 'Guard', required: true })
  guardId: Types.ObjectId;

  @ApiProperty({ description: 'Guard name (denormalized for quick access)' })
  @Prop({ required: true })
  guardName: string;

  @ApiProperty({ description: 'Attendance date (YYYY-MM-DD)' })
  @Prop({ required: true })
  date: string;

  @ApiProperty({ description: 'Check-in time', required: false })
  @Prop()
  checkIn?: string;

  @ApiProperty({ description: 'Check-out time', required: false })
  @Prop()
  checkOut?: string;

  @ApiProperty({ description: 'Attendance status', enum: ['present', 'absent', 'late', 'on-leave'] })
  @Prop({ required: true, enum: ['present', 'absent', 'late', 'on-leave'] })
  status: string;

  @ApiProperty({ description: 'Site name' })
  @Prop({ required: true })
  site: string;

  @ApiProperty({ description: 'Shift type' })
  @Prop({ required: true })
  shift: string;

  @ApiProperty({ description: 'Total work hours', required: false })
  @Prop()
  workHours?: number;

  @ApiProperty({ description: 'Additional notes', required: false })
  @Prop()
  notes?: string;

  @ApiProperty({ description: 'Check-in location', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  checkInLocation?: { latitude: number; longitude: number };

  @ApiProperty({ description: 'Check-out location', required: false })
  @Prop({ type: { latitude: Number, longitude: Number } })
  checkOutLocation?: { latitude: number; longitude: number };
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

// Create compound index for guard and date
AttendanceSchema.index({ guardId: 1, date: 1 }, { unique: true });
