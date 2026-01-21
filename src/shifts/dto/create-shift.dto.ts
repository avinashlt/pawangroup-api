import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsArray, IsDateString } from 'class-validator';

export class CreateShiftTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsNumber()
  @IsNotEmpty()
  breakDuration: number;

  @IsArray()
  @IsNotEmpty()
  daysOfWeek: number[];

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsNumber()
  @IsNotEmpty()
  requiredGuards: number;
}

export class CreateScheduledShiftDto {
  @IsString()
  @IsOptional()
  templateId?: string;

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

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsEnum(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled'])
  @IsOptional()
  status?: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
}
