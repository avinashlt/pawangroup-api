import { IsString, IsOptional, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  longitude: number;
}

export class CreateAttendanceDto {
  @ApiProperty({ description: 'Guard ID' })
  @IsString()
  guardId: string;

  @ApiProperty({ description: 'Guard name' })
  @IsString()
  guardName: string;

  @ApiProperty({ description: 'Date (YYYY-MM-DD)', example: '2026-02-08' })
  @IsString()
  date: string;

  @ApiPropertyOptional({ description: 'Check-in time', example: '08:00 AM' })
  @IsOptional()
  @IsString()
  checkIn?: string;

  @ApiPropertyOptional({ description: 'Check-out time', example: '04:00 PM' })
  @IsOptional()
  @IsString()
  checkOut?: string;

  @ApiProperty({ description: 'Attendance status', enum: ['present', 'absent', 'late', 'on-leave'] })
  @IsEnum(['present', 'absent', 'late', 'on-leave'])
  status: string;

  @ApiProperty({ description: 'Site name' })
  @IsString()
  site: string;

  @ApiProperty({ description: 'Shift', enum: ['morning', 'evening', 'night'] })
  @IsString()
  shift: string;

  @ApiPropertyOptional({ description: 'Work hours' })
  @IsOptional()
  @IsNumber()
  workHours?: number;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Check-in location', type: LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  checkInLocation?: LocationDto;

  @ApiPropertyOptional({ description: 'Check-out location', type: LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  checkOutLocation?: LocationDto;
}

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {}

export class AttendanceFilterDto {
  @ApiPropertyOptional({ description: 'Specific date (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Start date for range (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date for range (YYYY-MM-DD)' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Guard ID' })
  @IsOptional()
  @IsString()
  guardId?: string;

  @ApiPropertyOptional({ description: 'Site name' })
  @IsOptional()
  @IsString()
  site?: string;

  @ApiPropertyOptional({ description: 'Status', enum: ['present', 'absent', 'late', 'on-leave'] })
  @IsOptional()
  @IsEnum(['present', 'absent', 'late', 'on-leave'])
  status?: string;

  @ApiPropertyOptional({ description: 'Shift', enum: ['morning', 'evening', 'night'] })
  @IsOptional()
  @IsString()
  shift?: string;
}

export class CheckInDto {
  @ApiProperty({ description: 'Guard ID' })
  @IsString()
  guardId: string;

  @ApiProperty({ description: 'Guard name' })
  @IsString()
  guardName: string;

  @ApiProperty({ description: 'Site name' })
  @IsString()
  site: string;

  @ApiProperty({ description: 'Shift', enum: ['morning', 'evening', 'night'] })
  @IsString()
  shift: string;

  @ApiPropertyOptional({ description: 'Check-in location', type: LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}

export class CheckOutDto {
  @ApiProperty({ description: 'Guard ID' })
  @IsString()
  guardId: string;

  @ApiPropertyOptional({ description: 'Check-out location', type: LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}
