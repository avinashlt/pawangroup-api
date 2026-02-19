import { IsString, IsOptional, IsEnum, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ChecklistItemDto {
  @ApiProperty() @IsString() id: string;
  @ApiProperty() @IsString() label: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() required?: boolean;
  @ApiPropertyOptional({ enum: ['checkbox', 'text', 'number', 'photo', 'signature'] }) @IsOptional() @IsEnum(['checkbox', 'text', 'number', 'photo', 'signature']) type?: string;
}

export class CreateChecklistDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ enum: ['daily', 'weekly', 'monthly', 'incident', 'patrol', 'equipment'] }) @IsEnum(['daily', 'weekly', 'monthly', 'incident', 'patrol', 'equipment']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() siteId?: string;
  @ApiProperty({ type: [ChecklistItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => ChecklistItemDto) items: ChecklistItemDto[];
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateChecklistDto extends PartialType(CreateChecklistDto) {}

class SubmissionItemDto {
  @ApiProperty() @IsString() itemId: string;
  @ApiProperty() value: any;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class SubmitChecklistDto {
  @ApiProperty() @IsString() checklistId: string;
  @ApiProperty() @IsString() checklistName: string;
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty({ type: [SubmissionItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => SubmissionItemDto) responses: SubmissionItemDto[];
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() photos?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() signature?: string;
}

export class ReviewSubmissionDto {
  @ApiProperty({ enum: ['approved', 'rejected', 'needs-revision'] }) @IsEnum(['approved', 'rejected', 'needs-revision']) status: string;
  @ApiProperty() @IsString() reviewedBy: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reviewNotes?: string;
}
