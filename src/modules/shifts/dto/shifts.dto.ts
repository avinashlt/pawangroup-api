import { IsString, IsOptional, IsEnum, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty() @IsString() date: string;
  @ApiProperty() @IsString() startTime: string;
  @ApiProperty() @IsString() endTime: string;
  @ApiPropertyOptional({ enum: ['scheduled', 'in-progress', 'completed', 'cancelled'] }) @IsOptional() @IsEnum(['scheduled', 'in-progress', 'completed', 'cancelled']) status?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
export class UpdateShiftDto extends PartialType(CreateShiftDto) {}

export class CreateTemplateDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() siteId: string;
  @ApiProperty() @IsString() siteName: string;
  @ApiProperty() @IsString() startTime: string;
  @ApiProperty() @IsString() endTime: string;
  @ApiPropertyOptional({ type: [Number] }) @IsOptional() @IsArray() daysOfWeek?: number[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional() @IsOptional() minGuards?: number;
  @ApiPropertyOptional() @IsOptional() maxGuards?: number;
}
export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}

export class CreateSwapRequestDto {
  @ApiProperty() @IsString() requesterId: string;
  @ApiProperty() @IsString() requesterName: string;
  @ApiProperty() @IsString() targetGuardId: string;
  @ApiProperty() @IsString() targetGuardName: string;
  @ApiProperty() @IsString() shiftId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}
export class UpdateSwapRequestDto {
  @ApiProperty({ enum: ['pending', 'approved', 'rejected', 'cancelled'] }) @IsEnum(['pending', 'approved', 'rejected', 'cancelled']) status: string;
  @ApiPropertyOptional() @IsOptional() @IsString() approvedBy?: string;
}

export class CreateTimeOffRequestDto {
  @ApiProperty() @IsString() guardId: string;
  @ApiProperty() @IsString() guardName: string;
  @ApiProperty() @IsString() startDate: string;
  @ApiProperty() @IsString() endDate: string;
  @ApiProperty({ enum: ['vacation', 'sick', 'personal', 'other'] }) @IsEnum(['vacation', 'sick', 'personal', 'other']) type: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
}
export class UpdateTimeOffRequestDto {
  @ApiProperty({ enum: ['pending', 'approved', 'rejected', 'cancelled'] }) @IsEnum(['pending', 'approved', 'rejected', 'cancelled']) status: string;
  @ApiPropertyOptional() @IsOptional() @IsString() approvedBy?: string;
}
