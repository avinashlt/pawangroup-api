import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SosAlertsService } from './sos-alerts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSosAlertDto, RespondDto, ResolveDto } from './dto/sos-alerts.dto';

@ApiTags('sos-alerts')
@Controller('sos-alerts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SosAlertsController {
  constructor(private readonly service: SosAlertsService) {}

  @Post()
  @ApiOperation({ summary: 'Create SOS alert' })
  async create(@Body() dto: CreateSosAlertDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all SOS alerts' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  async findAll(@Query('status') status?: string, @Query('siteId') siteId?: string) { return this.service.findAll(status, siteId); }

  @Get('active')
  @ApiOperation({ summary: 'Get active SOS alerts' })
  async getActive() { return this.service.getActiveAlerts(); }

  @Get('stats')
  @ApiOperation({ summary: 'Get SOS alert statistics' })
  async getStats() { return this.service.getStats(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get SOS alert by ID' })
  async findById(@Param('id') id: string) { return this.service.findById(id); }

  @Patch(':id/respond')
  @ApiOperation({ summary: 'Respond to SOS alert' })
  async respond(@Param('id') id: string, @Body() dto: RespondDto) { return this.service.respond(id, dto.respondedBy); }

  @Patch(':id/resolve')
  @ApiOperation({ summary: 'Resolve SOS alert' })
  async resolve(@Param('id') id: string, @Body() dto: ResolveDto) { return this.service.resolve(id, dto.resolvedBy, dto.resolutionNotes); }
}
