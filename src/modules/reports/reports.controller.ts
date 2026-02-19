import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReportDto, CreateConfigDto, UpdateConfigDto } from './dto/reports.dto';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Create report' })
  async createReport(@Body() dto: CreateReportDto) { return this.service.createReport(dto); }

  @Get()
  @ApiOperation({ summary: 'Get reports' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  async findReports(@Query('type') type?: string, @Query('siteId') siteId?: string) { return this.service.findReports(type, siteId); }

  @Get('configs')
  @ApiOperation({ summary: 'Get report configurations' })
  async findConfigs() { return this.service.findConfigs(); }

  @Post('configs')
  @ApiOperation({ summary: 'Create report configuration' })
  async createConfig(@Body() dto: CreateConfigDto) { return this.service.createConfig(dto); }

  @Put('configs/:id')
  @ApiOperation({ summary: 'Update report configuration' })
  async updateConfig(@Param('id') id: string, @Body() dto: UpdateConfigDto) { return this.service.updateConfig(id, dto); }

  @Delete('configs/:id')
  @ApiOperation({ summary: 'Delete report configuration' })
  async deleteConfig(@Param('id') id: string) { await this.service.deleteConfig(id); return { message: 'Config deleted' }; }

  @Get('guard-performance/:guardId')
  @ApiOperation({ summary: 'Get guard performance metrics' })
  @ApiQuery({ name: 'startDate', required: true })
  @ApiQuery({ name: 'endDate', required: true })
  async getGuardPerformance(@Param('guardId') guardId: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getGuardPerformance(guardId, startDate, endDate);
  }

  @Get('site-performance/:siteId')
  @ApiOperation({ summary: 'Get site performance metrics' })
  @ApiQuery({ name: 'startDate', required: true })
  @ApiQuery({ name: 'endDate', required: true })
  async getSitePerformance(@Param('siteId') siteId: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getSitePerformance(siteId, startDate, endDate);
  }

  @Get('dashboard-metrics')
  @ApiOperation({ summary: 'Get dashboard metrics' })
  @ApiQuery({ name: 'startDate', required: true })
  @ApiQuery({ name: 'endDate', required: true })
  async getDashboardMetrics(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.service.getDashboardMetrics(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  async findReportById(@Param('id') id: string) { return this.service.findReportById(id); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete report' })
  async deleteReport(@Param('id') id: string) { await this.service.deleteReport(id); return { message: 'Report deleted' }; }
}
