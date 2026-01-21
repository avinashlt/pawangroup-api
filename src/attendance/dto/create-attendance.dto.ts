import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  guardId: string;

  @IsString()
  @IsNotEmpty()
  guardName: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  checkIn?: string;

  @IsString()
  @IsOptional()
  checkOut?: string;

  @IsEnum(['present', 'absent', 'late', 'on-leave'])
  @IsNotEmpty()
  status: 'present' | 'absent' | 'late' | 'on-leave';

  @IsString()
  @IsNotEmpty()
  site: string;

  @IsString()
  @IsNotEmpty()
  shift: string;

  @IsNumber()
  @IsOptional()
  workHours?: number;

  @IsNumber()
  @IsOptional()
  checkInLatitude?: number;

  @IsNumber()
  @IsOptional()
  checkInLongitude?: number;

  @IsNumber()
  @IsOptional()
  checkOutLatitude?: number;

  @IsNumber()
  @IsOptional()
  checkOutLongitude?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
