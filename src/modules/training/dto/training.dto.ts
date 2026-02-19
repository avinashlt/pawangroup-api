import { IsString, IsOptional, IsEnum, IsArray, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateTrainingDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ enum: ['onboarding', 'compliance', 'safety', 'skills', 'certification', 'refresher'] }) @IsEnum(['onboarding', 'compliance', 'safety', 'skills', 'certification', 'refresher']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() durationMinutes?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() modules?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() videoUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() documentUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() passingScore?: number;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isMandatory?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsNumber() validityMonths?: number;
}
export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {}

export class AssignTrainingDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() trainingId: string;
  @ApiProperty() @IsString() trainingName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() dueDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() assignedBy?: string;
}

export class CompleteTrainingDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(100) score?: number;
}

export class UpdateProgressDto {
  @ApiProperty() @IsNumber() @Min(0) @Max(100) progress: number;
}
