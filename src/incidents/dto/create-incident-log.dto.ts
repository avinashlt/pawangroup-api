import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateIncidentLogDto {
  @IsString()
  @IsNotEmpty()
  guardId: string;

  @IsString()
  @IsNotEmpty()
  guardName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['low', 'medium', 'high', 'critical'])
  @IsNotEmpty()
  severity: 'low' | 'medium' | 'high' | 'critical';

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
  @IsNotEmpty()
  site: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
