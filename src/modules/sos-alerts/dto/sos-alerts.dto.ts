import { IsString, IsOptional, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto { @ApiProperty() @IsNumber() latitude: number; @ApiProperty() @IsNumber() longitude: number; }

export class CreateSosAlertDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty({ type: LocationDto }) @ValidateNested() @Type(() => LocationDto) location: LocationDto;
  @ApiPropertyOptional({ enum: ['panic', 'medical', 'fire', 'intrusion', 'other'] }) @IsOptional() @IsEnum(['panic', 'medical', 'fire', 'intrusion', 'other']) alertType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() message?: string;
}

export class RespondDto {
  @ApiProperty() @IsString() respondedBy: string;
}

export class ResolveDto {
  @ApiProperty() @IsString() resolvedBy: string;
  @ApiPropertyOptional() @IsOptional() @IsString() resolutionNotes?: string;
}
