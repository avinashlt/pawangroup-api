import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCheckpointDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['nfc', 'qr', 'beacon'])
  @IsNotEmpty()
  type: 'nfc' | 'qr' | 'beacon';

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  scanFrequency: number;
}

export class CreateCheckpointScanDto {
  @IsString()
  @IsNotEmpty()
  checkpointId: string;

  @IsString()
  @IsNotEmpty()
  checkpointName: string;

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

  @IsEnum(['on-time', 'late', 'missed'])
  @IsOptional()
  status?: 'on-time' | 'late' | 'missed';

  @IsString()
  @IsOptional()
  notes?: string;
}
