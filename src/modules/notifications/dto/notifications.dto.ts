import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() message: string;
  @ApiProperty({ enum: ['alert', 'info', 'warning', 'success', 'sos', 'incident', 'attendance', 'geofence'] }) @IsEnum(['alert', 'info', 'warning', 'success', 'sos', 'incident', 'attendance', 'geofence']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() userId?: string;
  @ApiPropertyOptional({ enum: ['low', 'medium', 'high', 'critical'] }) @IsOptional() @IsEnum(['low', 'medium', 'high', 'critical']) priority?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() actionUrl?: string;
}

export class BroadcastDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() message: string;
  @ApiProperty({ enum: ['alert', 'info', 'warning', 'success'] }) @IsEnum(['alert', 'info', 'warning', 'success']) type: string;
  @ApiPropertyOptional({ enum: ['low', 'medium', 'high', 'critical'] }) @IsOptional() @IsEnum(['low', 'medium', 'high', 'critical']) priority?: string;
}
