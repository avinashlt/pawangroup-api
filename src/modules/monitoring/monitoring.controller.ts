import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MonitoringService } from './monitoring.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSessionDto, CreateSleepAlertDto, AcknowledgeAlertDto, CreateAIAlertDto, UpdateAIAlertDto } from './dto/monitoring.dto';

@ApiTags('monitoring')
@Controller('monitoring')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MonitoringController {
  constructor(private readonly service: MonitoringService) {}

  // Sessions
  @Post('sessions')
  @ApiOperation({ summary: 'Create monitoring session' })
  async createSession(@Body() dto: CreateSessionDto) { return this.service.createSession(dto); }

  @Get('sessions')
  @ApiOperation({ summary: 'Get monitoring sessions' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findSessions(@Query('guardId') guardId?: string, @Query('siteId') siteId?: string, @Query('status') status?: string) {
    return this.service.findSessions(guardId, siteId, status);
  }

  @Get('sessions/active')
  @ApiOperation({ summary: 'Get active monitoring sessions' })
  async getActiveSessions() { return this.service.getActiveSessions(); }

  @Patch('sessions/:id/end')
  @ApiOperation({ summary: 'End monitoring session' })
  async endSession(@Param('id') id: string) { return this.service.endSession(id); }

  @Patch('sessions/:id/heartbeat')
  @ApiOperation({ summary: 'Update session heartbeat' })
  async updateHeartbeat(@Param('id') id: string) { return this.service.updateHeartbeat(id); }

  // Sleep alerts
  @Post('sleep-alerts')
  @ApiOperation({ summary: 'Create sleep alert' })
  async createSleepAlert(@Body() dto: CreateSleepAlertDto) { return this.service.createSleepAlert(dto); }

  @Get('sleep-alerts')
  @ApiOperation({ summary: 'Get sleep alerts' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'acknowledged', required: false, type: Boolean })
  async findSleepAlerts(@Query('guardId') guardId?: string, @Query('siteId') siteId?: string, @Query('acknowledged') acknowledged?: boolean) {
    return this.service.findSleepAlerts(guardId, siteId, acknowledged);
  }

  @Patch('sleep-alerts/:id/acknowledge')
  @ApiOperation({ summary: 'Acknowledge sleep alert' })
  async acknowledgeSleepAlert(@Param('id') id: string, @Body() dto: AcknowledgeAlertDto) {
    return this.service.acknowledgeSleepAlert(id, dto.acknowledgedBy);
  }

  // AI alerts
  @Post('ai-alerts')
  @ApiOperation({ summary: 'Create AI alert' })
  async createAIAlert(@Body() dto: CreateAIAlertDto) { return this.service.createAIAlert(dto); }

  @Get('ai-alerts')
  @ApiOperation({ summary: 'Get AI alerts' })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findAIAlerts(@Query('siteId') siteId?: string, @Query('type') type?: string, @Query('status') status?: string) {
    return this.service.findAIAlerts(siteId, type, status);
  }

  @Patch('ai-alerts/:id')
  @ApiOperation({ summary: 'Update AI alert status' })
  async updateAIAlertStatus(@Param('id') id: string, @Body() dto: UpdateAIAlertDto) {
    return this.service.updateAIAlertStatus(id, dto.status, dto.reviewedBy, dto.reviewNotes);
  }

  // Metrics
  @Get('metrics')
  @ApiOperation({ summary: 'Get monitoring metrics' })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getMonitoringMetrics(@Query('siteId') siteId?: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.service.getMonitoringMetrics(siteId, startDate, endDate);
  }
}
