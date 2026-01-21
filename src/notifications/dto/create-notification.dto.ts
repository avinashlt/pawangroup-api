import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsEnum(['shift-confirmation', 'clock-in', 'clock-out', 'incident', 'sos', 'geofence', 'checkpoint', 'system'])
  @IsNotEmpty()
  type: 'shift-confirmation' | 'clock-in' | 'clock-out' | 'incident' | 'sos' | 'geofence' | 'checkpoint' | 'system';

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(['low', 'medium', 'high', 'critical'])
  @IsOptional()
  priority?: 'low' | 'medium' | 'high' | 'critical';

  @IsString()
  @IsOptional()
  relatedId?: string;

  @IsString()
  @IsOptional()
  relatedType?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
