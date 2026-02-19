import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics' })
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('attendance-trend')
  @ApiOperation({ summary: 'Get attendance trend for past days' })
  @ApiResponse({ status: 200, description: 'Attendance trend data' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days (default: 7)' })
  async getAttendanceTrend(@Query('days') days?: number) {
    return this.dashboardService.getAttendanceTrend(days || 7);
  }

  @Get('incident-trend')
  @ApiOperation({ summary: 'Get incident trend for past days' })
  @ApiResponse({ status: 200, description: 'Incident trend data' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days (default: 7)' })
  async getIncidentTrend(@Query('days') days?: number) {
    return this.dashboardService.getIncidentTrend(days || 7);
  }

  @Get('recent-alerts')
  @ApiOperation({ summary: 'Get recent alerts from all sources' })
  @ApiResponse({ status: 200, description: 'Recent alerts' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit per type (default: 10)' })
  async getRecentAlerts(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentAlerts(limit || 10);
  }
}
