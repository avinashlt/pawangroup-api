import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty() @IsNumber() latitude: number;
  @ApiProperty() @IsNumber() longitude: number;
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string;
}

export class CreateCheckpointDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ enum: ['nfc', 'qr', 'beacon'] }) @IsEnum(['nfc', 'qr', 'beacon']) type: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty({ type: LocationDto }) @ValidateNested() @Type(() => LocationDto) location: LocationDto;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiProperty({ description: 'Scan frequency in minutes' }) @IsNumber() scanFrequency: number;
  @ApiPropertyOptional() @IsOptional() @IsString() codeIdentifier?: string;
}

export class UpdateCheckpointDto extends PartialType(CreateCheckpointDto) {}

export class RecordScanDto {
  @ApiProperty() @IsString() checkpointId: string;
  @ApiProperty() @IsString() checkpointName: string;
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty({ type: LocationDto }) @ValidateNested() @Type(() => LocationDto) location: LocationDto;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
