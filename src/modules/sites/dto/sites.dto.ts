import { IsString, IsOptional, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocationDto {
  @ApiProperty() @IsNumber() latitude: number;
  @ApiProperty() @IsNumber() longitude: number;
}

export class CreateSiteDto {
  @ApiProperty({ example: 'Tech Park Gate A' }) @IsString() name: string;
  @ApiProperty({ example: '123 Tech Park Road, Bengaluru' }) @IsString() address: string;
  @ApiProperty({ example: 'ABC Corporation' }) @IsString() clientName: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPerson?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactEmail?: string;
  @ApiPropertyOptional({ default: true }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiPropertyOptional({ type: LocationDto }) @IsOptional() @ValidateNested() @Type(() => LocationDto) location?: LocationDto;
  @ApiPropertyOptional({ default: 1 }) @IsOptional() @IsNumber() requiredGuards?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() operatingHours?: string;
}

export class UpdateSiteDto extends PartialType(CreateSiteDto) {}
