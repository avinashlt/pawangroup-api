import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class CoordinateDto { @ApiProperty() @IsNumber() latitude: number; @ApiProperty() @IsNumber() longitude: number; }

export class CreateGeofenceDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty({ enum: ['circle', 'polygon'] }) @IsEnum(['circle', 'polygon']) type: string;
  @ApiPropertyOptional({ type: CoordinateDto }) @IsOptional() @ValidateNested() @Type(() => CoordinateDto) center?: CoordinateDto;
  @ApiPropertyOptional() @IsOptional() @IsNumber() radius?: number;
  @ApiPropertyOptional({ type: [CoordinateDto] }) @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CoordinateDto) polygon?: CoordinateDto[];
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() alertOnExit?: boolean;
  @ApiPropertyOptional({ default: false }) @IsOptional() @IsBoolean() alertOnEntry?: boolean;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) assignedGuards?: string[];
}

export class UpdateGeofenceDto extends PartialType(CreateGeofenceDto) {}

export class CreateAlertDto {
  @ApiProperty() @IsString() geofenceId: string;
  @ApiProperty() @IsString() geofenceName: string;
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty({ enum: ['entry', 'exit'] }) @IsEnum(['entry', 'exit']) alertType: string;
  @ApiProperty({ type: CoordinateDto }) @ValidateNested() @Type(() => CoordinateDto) location: CoordinateDto;
}

export class AcknowledgeAlertDto {
  @ApiProperty() @IsString() acknowledgedBy: string;
}
