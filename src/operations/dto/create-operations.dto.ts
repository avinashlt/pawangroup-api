import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateChecklistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  siteId: string;

  @IsString()
  @IsNotEmpty()
  siteName: string;

  @IsEnum(['patrol', 'opening', 'closing', 'safety', 'custom'])
  @IsNotEmpty()
  type: 'patrol' | 'opening' | 'closing' | 'safety' | 'custom';

  @IsArray()
  @IsOptional()
  items?: { description: string; isRequired: boolean; order: number }[];
}

export class CreateTrainingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['mandatory', 'optional', 'certification'])
  @IsNotEmpty()
  type: 'mandatory' | 'optional' | 'certification';

  @IsNotEmpty()
  duration: number;

  @IsOptional()
  validityPeriod?: number;
}
