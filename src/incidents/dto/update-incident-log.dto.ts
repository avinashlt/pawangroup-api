import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentLogDto } from './create-incident-log.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateIncidentLogDto extends PartialType(CreateIncidentLogDto) {
  @IsEnum(['new', 'reviewing', 'resolved', 'escalated'])
  @IsOptional()
  status?: 'new' | 'reviewing' | 'resolved' | 'escalated';

  @IsString()
  @IsOptional()
  resolvedBy?: string;
}
