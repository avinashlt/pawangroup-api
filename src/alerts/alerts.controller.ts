import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateSOSAlertDto, CreateSleepAlertDto, CreateAIAlertDto } from './dto/create-alert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post('sos')
  createSOSAlert(@Body() dto: CreateSOSAlertDto) {
    return this.alertsService.createSOSAlert(dto);
  }

  @Get('sos')
  findAllSOSAlerts(@Query('active') active?: string) {
    if (active === 'true') {
      return this.alertsService.findActiveSOSAlerts();
    }
    return this.alertsService.findAllSOSAlerts();
  }

  @Patch('sos/:id/status')
  updateSOSAlertStatus(
    @Param('id') id: string,
    @Body('status') status: 'active' | 'responding' | 'resolved' | 'false-alarm',
    @Body('respondedBy') respondedBy?: string,
  ) {
    return this.alertsService.updateSOSAlertStatus(id, status, respondedBy);
  }

  @Post('sleep')
  createSleepAlert(@Body() dto: CreateSleepAlertDto) {
    return this.alertsService.createSleepAlert(dto);
  }

  @Get('sleep')
  findAllSleepAlerts() {
    return this.alertsService.findAllSleepAlerts();
  }

  @Post('ai')
  createAIAlert(@Body() dto: CreateAIAlertDto) {
    return this.alertsService.createAIAlert(dto);
  }

  @Get('ai')
  findAllAIAlerts(@Query('siteId') siteId?: string) {
    if (siteId) {
      return this.alertsService.findAIAlertsBySite(siteId);
    }
    return this.alertsService.findAllAIAlerts();
  }
}
