import { IsString, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ enum: ['attendance', 'incidents', 'performance', 'compliance', 'custom'] }) @IsEnum(['attendance', 'incidents', 'performance', 'compliance', 'custom']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() siteId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() startDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() endDate?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() filters?: string[];
  @ApiPropertyOptional({ enum: ['pdf', 'csv', 'excel'] }) @IsOptional() @IsEnum(['pdf', 'csv', 'excel']) format?: string;
}

export class CreateConfigDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ enum: ['attendance', 'incidents', 'performance', 'compliance', 'custom'] }) @IsEnum(['attendance', 'incidents', 'performance', 'compliance', 'custom']) type: string;
  @ApiPropertyOptional({ enum: ['daily', 'weekly', 'monthly', 'quarterly'] }) @IsOptional() @IsEnum(['daily', 'weekly', 'monthly', 'quarterly']) schedule?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() recipients?: string[];
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional({ type: Object }) @IsOptional() filters?: Record<string, any>;
}
export class UpdateConfigDto extends PartialType(CreateConfigDto) {}
