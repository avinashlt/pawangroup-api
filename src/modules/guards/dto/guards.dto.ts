import { IsString, IsOptional, IsEnum, IsEmail, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateGuardDto {
  @ApiProperty({ description: 'Full name of the guard', example: 'Rajesh Kumar' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Employee ID', example: 'EMP001' })
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'Phone number', example: '+91 98765 43210' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ description: 'Assigned site', example: 'Tech Park Gate A' })
  @IsString()
  assignedSite: string;

  @ApiProperty({ description: 'Shift type', enum: ['morning', 'evening', 'night'] })
  @IsEnum(['morning', 'evening', 'night'])
  shift: string;

  @ApiPropertyOptional({ description: 'Guard status', enum: ['active', 'inactive', 'on-leave'], default: 'active' })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'on-leave'])
  status?: string;

  @ApiPropertyOptional({ description: 'Email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Date of joining' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfJoining?: Date;

  @ApiPropertyOptional({ description: 'Emergency contact' })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({ description: 'Address' })
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateGuardDto extends PartialType(CreateGuardDto) {}

export class GuardFilterDto {
  @ApiPropertyOptional({ description: 'Filter by status', enum: ['active', 'inactive', 'on-leave'] })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'on-leave'])
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by shift', enum: ['morning', 'evening', 'night'] })
  @IsOptional()
  @IsEnum(['morning', 'evening', 'night'])
  shift?: string;

  @ApiPropertyOptional({ description: 'Filter by assigned site' })
  @IsOptional()
  @IsString()
  assignedSite?: string;

  @ApiPropertyOptional({ description: 'Search by name, employee ID, or phone' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GuardResponseDto {
  @ApiProperty({ description: 'Guard ID' })
  _id: string;

  @ApiProperty({ description: 'Full name' })
  name: string;

  @ApiProperty({ description: 'Employee ID' })
  employeeId: string;

  @ApiProperty({ description: 'Phone number' })
  phone: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  photo?: string;

  @ApiProperty({ description: 'Assigned site' })
  assignedSite: string;

  @ApiProperty({ description: 'Shift type', enum: ['morning', 'evening', 'night'] })
  shift: string;

  @ApiProperty({ description: 'Status', enum: ['active', 'inactive', 'on-leave'] })
  status: string;

  @ApiPropertyOptional({ description: 'Email' })
  email?: string;

  @ApiPropertyOptional({ description: 'Date of joining' })
  dateOfJoining?: Date;

  @ApiPropertyOptional({ description: 'Emergency contact' })
  emergencyContact?: string;

  @ApiPropertyOptional({ description: 'Address' })
  address?: string;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at timestamp' })
  updatedAt: Date;
}
