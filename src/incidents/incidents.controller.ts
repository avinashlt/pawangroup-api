import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  create(@Body() createIncidentLogDto: CreateIncidentLogDto) {
    return this.incidentsService.create(createIncidentLogDto);
  }

  @Get()
  findAll(
    @Query('guardId') guardId?: string,
    @Query('severity') severity?: 'low' | 'medium' | 'high' | 'critical',
    @Query('status') status?: 'new' | 'reviewing' | 'resolved' | 'escalated',
    @Query('site') site?: string,
  ) {
    if (guardId) {
      return this.incidentsService.findByGuard(guardId);
    }
    if (severity) {
      return this.incidentsService.findBySeverity(severity);
    }
    if (status) {
      return this.incidentsService.findByStatus(status);
    }
    if (site) {
      return this.incidentsService.findBySite(site);
    }
    return this.incidentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentLogDto: UpdateIncidentLogDto) {
    return this.incidentsService.update(id, updateIncidentLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentsService.remove(id);
  }
}
