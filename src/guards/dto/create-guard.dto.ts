import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateGuardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  assignedSite?: string;

  @IsEnum(['morning', 'evening', 'night'])
  @IsNotEmpty()
  shift: 'morning' | 'evening' | 'night';

  @IsEnum(['active', 'inactive', 'on-leave'])
  @IsOptional()
  status?: 'active' | 'inactive' | 'on-leave';

  @IsString()
  @IsOptional()
  address?: string;

  @IsDateString()
  @IsOptional()
  dateOfJoining?: Date;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  emergencyContactName?: string;
}
