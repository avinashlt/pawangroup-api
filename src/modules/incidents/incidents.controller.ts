import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto, UpdateIncidentDto, IncidentFilterDto, UpdateStatusDto, AddMediaDto } from './dto/incidents.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('incidents')
@Controller('incidents')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new incident' })
  @ApiResponse({ status: 201, description: 'Incident created' })
  async create(@Body() createDto: CreateIncidentDto) {
    return this.incidentsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all incidents with filters' })
  @ApiResponse({ status: 200, description: 'List of incidents' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'severity', required: false, enum: ['low', 'medium', 'high', 'critical'] })
  @ApiQuery({ name: 'status', required: false, enum: ['new', 'reviewing', 'resolved', 'escalated'] })
  @ApiQuery({ name: 'site', required: false })
  async findAll(@Query() filterDto: IncidentFilterDto) {
    return this.incidentsService.findAll(filterDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active incidents' })
  @ApiResponse({ status: 200, description: 'List of active incidents' })
  async getActiveIncidents() {
    return this.incidentsService.getActiveIncidents();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent incidents' })
  @ApiResponse({ status: 200, description: 'Recent incidents' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getRecentIncidents(@Query('limit') limit?: number) {
    return this.incidentsService.getRecentIncidents(limit || 10);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get incident statistics' })
  @ApiResponse({ status: 200, description: 'Incident statistics' })
  async getStats() {
    return this.incidentsService.getStats();
  }

  @Get('severity/:severity')
  @ApiOperation({ summary: 'Get incidents by severity' })
  @ApiResponse({ status: 200, description: 'Incidents by severity' })
  async getIncidentsBySeverity(@Param('severity') severity: string) {
    return this.incidentsService.getIncidentsBySeverity(severity);
  }

  @Get('guard/:guardId')
  @ApiOperation({ summary: 'Get incidents by guard' })
  @ApiResponse({ status: 200, description: 'Incidents reported by guard' })
  async getIncidentsByGuard(@Param('guardId') guardId: string) {
    return this.incidentsService.getIncidentsByGuard(guardId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get incident by ID' })
  @ApiResponse({ status: 200, description: 'Incident details' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update incident' })
  @ApiResponse({ status: 200, description: 'Incident updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateIncidentDto) {
    return this.incidentsService.update(id, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update incident status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async updateStatus(@Param('id') id: string, @Body() statusDto: UpdateStatusDto) {
    return this.incidentsService.updateStatus(
      id,
      statusDto.status,
      statusDto.resolvedBy,
      statusDto.notes,
    );
  }

  @Post(':id/media')
  @ApiOperation({ summary: 'Add media to incident' })
  @ApiResponse({ status: 200, description: 'Media added' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async addMedia(@Param('id') id: string, @Body() mediaDto: AddMediaDto) {
    return this.incidentsService.addMedia(id, mediaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete incident' })
  @ApiResponse({ status: 200, description: 'Incident deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id') id: string) {
    await this.incidentsService.remove(id);
    return { message: 'Incident deleted successfully' };
  }
}
