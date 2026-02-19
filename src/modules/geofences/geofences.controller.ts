import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GeofencesService } from './geofences.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGeofenceDto, UpdateGeofenceDto, CreateAlertDto, AcknowledgeAlertDto } from './dto/geofences.dto';

@ApiTags('geofences')
@Controller('geofences')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GeofencesController {
  constructor(private readonly service: GeofencesService) {}

  @Post()
  @ApiOperation({ summary: 'Create geofence' })
  async create(@Body() dto: CreateGeofenceDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all geofences' })
  @ApiQuery({ name: 'siteId', required: false })
  async findAll(@Query('siteId') siteId?: string) { return this.service.findAll(siteId); }

  @Get('alerts')
  @ApiOperation({ summary: 'Get geofence alerts' })
  @ApiQuery({ name: 'geofenceId', required: false })
  @ApiQuery({ name: 'acknowledged', required: false, type: Boolean })
  async getAlerts(@Query('geofenceId') geofenceId?: string, @Query('acknowledged') acknowledged?: boolean) {
    return this.service.getAlerts(geofenceId, acknowledged);
  }

  @Post('alerts')
  @ApiOperation({ summary: 'Create geofence alert' })
  async createAlert(@Body() dto: CreateAlertDto) { return this.service.createAlert(dto); }

  @Patch('alerts/:id/acknowledge')
  @ApiOperation({ summary: 'Acknowledge alert' })
  async acknowledgeAlert(@Param('id') id: string, @Body() dto: AcknowledgeAlertDto) {
    return this.service.acknowledgeAlert(id, dto.acknowledgedBy);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get geofence by ID' })
  async findById(@Param('id') id: string) { return this.service.findById(id); }

  @Put(':id')
  @ApiOperation({ summary: 'Update geofence' })
  async update(@Param('id') id: string, @Body() dto: UpdateGeofenceDto) { return this.service.update(id, dto); }

  @Patch(':id/assign/:guardId')
  @ApiOperation({ summary: 'Assign guard to geofence' })
  async assignGuard(@Param('id') id: string, @Param('guardId') guardId: string) { return this.service.assignGuard(id, guardId); }

  @Patch(':id/unassign/:guardId')
  @ApiOperation({ summary: 'Remove guard from geofence' })
  async removeGuard(@Param('id') id: string, @Param('guardId') guardId: string) { return this.service.removeGuard(id, guardId); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete geofence' })
  async delete(@Param('id') id: string) { await this.service.delete(id); return { message: 'Geofence deleted' }; }
}
