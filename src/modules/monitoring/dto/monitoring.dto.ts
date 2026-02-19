import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() deviceId?: string;
}

export class CreateSleepAlertDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() cameraId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() cameraName?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() confidence?: number;
}

export class AcknowledgeAlertDto {
  @ApiProperty() @IsString() acknowledgedBy: string;
}

export class CreateAIAlertDto {
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() cameraId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() cameraName?: string;
  @ApiProperty({ enum: ['intrusion', 'loitering', 'abandoned-object', 'crowd', 'fire', 'smoke', 'vehicle', 'weapon', 'other'] }) @IsEnum(['intrusion', 'loitering', 'abandoned-object', 'crowd', 'fire', 'smoke', 'vehicle', 'weapon', 'other']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() imageUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() videoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() confidence?: number;
}

export class UpdateAIAlertDto {
  @ApiProperty({ enum: ['new', 'reviewing', 'confirmed', 'false-positive', 'resolved'] }) @IsEnum(['new', 'reviewing', 'confirmed', 'false-positive', 'resolved']) status: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewedBy?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewNotes?: string;
}
