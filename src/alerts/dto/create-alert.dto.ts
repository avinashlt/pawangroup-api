import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateSOSAlertDto {
  @IsString()
  @IsNotEmpty()
  guardId: string;

  @IsString()
  @IsNotEmpty()
  guardName: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateSleepAlertDto {
  @IsString()
  @IsNotEmpty()
  guardId: string;

  @IsString()
  @IsNotEmpty()
  guardName: string;

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

export class CreateAIAlertDto {
  @IsEnum(['intrusion', 'suspicious-activity', 'unauthorized-access', 'object-detection', 'crowd-detection'])
  @IsNotEmpty()
  type: 'intrusion' | 'suspicious-activity' | 'unauthorized-access' | 'object-detection' | 'crowd-detection';

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsString()
  @IsNotEmpty()
  cameraId: string;

  @IsString()
  @IsNotEmpty()
  cameraName: string;

  @IsNumber()
  @IsNotEmpty()
  confidence: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  videoClip?: string;
}
