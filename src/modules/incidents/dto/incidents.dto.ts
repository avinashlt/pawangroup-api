import { IsString, IsOptional, IsEnum, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty({ description: 'Latitude' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ description: 'Address' })
  @IsOptional()
  @IsString()
  address?: string;
}

class MediaDto {
  @ApiProperty({ description: 'Media type', enum: ['image', 'video'] })
  @IsEnum(['image', 'video'])
  type: string;

  @ApiProperty({ description: 'Media URL' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional({ description: 'Duration in seconds (for videos)' })
  @IsOptional()
  @IsNumber()
  duration?: number;
}

export class CreateIncidentDto {
  @ApiProperty({ description: 'Guard ID' })
  @IsString()
  guardId: string;

  @ApiProperty({ description: 'Guard name' })
  @IsString()
  guardName: string;

  @ApiProperty({ description: 'Incident title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Incident description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Timestamp' })
  @IsOptional()
  @IsString()
  timestamp?: string;

  @ApiProperty({ description: 'Severity', enum: ['low', 'medium', 'high', 'critical'] })
  @IsEnum(['low', 'medium', 'high', 'critical'])
  severity: string;

  @ApiProperty({ description: 'Location', type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ description: 'Site name' })
  @IsString()
  site: string;

  @ApiPropertyOptional({ description: 'Media attachments', type: [MediaDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media?: MediaDto[];

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateIncidentDto extends PartialType(CreateIncidentDto) {}

export class IncidentFilterDto {
  @ApiPropertyOptional({ description: 'Start date (ISO)' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date (ISO)' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'Guard ID' })
  @IsOptional()
  @IsString()
  guardId?: string;

  @ApiPropertyOptional({ description: 'Severity', enum: ['low', 'medium', 'high', 'critical'] })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'critical'])
  severity?: string;

  @ApiPropertyOptional({ description: 'Status', enum: ['new', 'reviewing', 'resolved', 'escalated'] })
  @IsOptional()
  @IsEnum(['new', 'reviewing', 'resolved', 'escalated'])
  status?: string;

  @ApiPropertyOptional({ description: 'Site name' })
  @IsOptional()
  @IsString()
  site?: string;
}

export class UpdateStatusDto {
  @ApiProperty({ description: 'New status', enum: ['new', 'reviewing', 'resolved', 'escalated'] })
  @IsEnum(['new', 'reviewing', 'resolved', 'escalated'])
  status: string;

  @ApiPropertyOptional({ description: 'Resolved by username' })
  @IsOptional()
  @IsString()
  resolvedBy?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddMediaDto {
  @ApiProperty({ description: 'Media type', enum: ['image', 'video'] })
  @IsEnum(['image', 'video'])
  type: string;

  @ApiProperty({ description: 'Media URL' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ description: 'Thumbnail URL' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional({ description: 'Duration in seconds (for videos)' })
  @IsOptional()
  @IsNumber()
  duration?: number;
}
