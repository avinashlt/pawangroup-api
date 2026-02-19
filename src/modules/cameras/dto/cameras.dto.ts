import { IsString, IsOptional, IsEnum, IsBoolean, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto { @ApiProperty() @IsNumber() latitude: number; @ApiProperty() @IsNumber() longitude: number; }

export class CreateCameraDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiPropertyOptional({ enum: ['fixed', 'ptz', 'dome', 'bullet', 'thermal'] }) @IsOptional() @IsEnum(['fixed', 'ptz', 'dome', 'bullet', 'thermal']) type?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() streamUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() rtspUrl?: string;
  @ApiPropertyOptional({ type: LocationDto }) @IsOptional() @ValidateNested() @Type(() => LocationDto) location?: LocationDto;
  @ApiPropertyOptional({ enum: ['online', 'offline', 'maintenance', 'error'] }) @IsOptional() @IsEnum(['online', 'offline', 'maintenance', 'error']) status?: string;
  @ApiPropertyOptional({ default: false }) @IsOptional() @IsBoolean() isRecording?: boolean;
  @ApiPropertyOptional({ default: false }) @IsOptional() @IsBoolean() hasAI?: boolean;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() aiFeatures?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() manufacturer?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() model?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() ipAddress?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() resolution?: string;
}
export class UpdateCameraDto extends PartialType(CreateCameraDto) {}

export class UpdateStatusDto {
  @ApiProperty({ enum: ['online', 'offline', 'maintenance', 'error'] }) @IsEnum(['online', 'offline', 'maintenance', 'error']) status: string;
}

export class BulkUpdateStatusDto {
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) cameraIds: string[];
  @ApiProperty({ enum: ['online', 'offline', 'maintenance', 'error'] }) @IsEnum(['online', 'offline', 'maintenance', 'error']) status: string;
}
