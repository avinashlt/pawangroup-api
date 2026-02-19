import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CamerasService } from './cameras.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCameraDto, UpdateCameraDto, UpdateStatusDto, BulkUpdateStatusDto } from './dto/cameras.dto';

@ApiTags('cameras')
@Controller('cameras')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CamerasController {
  constructor(private readonly service: CamerasService) {}

  @Post()
  @ApiOperation({ summary: 'Create camera' })
  async create(@Body() dto: CreateCameraDto) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all cameras' })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'type', required: false })
  async findAll(@Query('siteId') siteId?: string, @Query('status') status?: string, @Query('type') type?: string) {
    return this.service.findAll(siteId, status, type);
  }

  @Get('online')
  @ApiOperation({ summary: 'Get online cameras' })
  async getOnlineCameras() { return this.service.getOnlineCameras(); }

  @Get('offline')
  @ApiOperation({ summary: 'Get offline cameras' })
  async getOfflineCameras() { return this.service.getOfflineCameras(); }

  @Get('stats')
  @ApiOperation({ summary: 'Get camera statistics' })
  async getCameraStats() { return this.service.getCameraStats(); }

  @Get('site/:siteId')
  @ApiOperation({ summary: 'Get cameras by site' })
  async getCamerasBySite(@Param('siteId') siteId: string) { return this.service.getCamerasBySite(siteId); }

  @Get(':id')
  @ApiOperation({ summary: 'Get camera by ID' })
  async findById(@Param('id') id: string) { return this.service.findById(id); }

  @Put(':id')
  @ApiOperation({ summary: 'Update camera' })
  async update(@Param('id') id: string, @Body() dto: UpdateCameraDto) { return this.service.update(id, dto); }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update camera status' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) { return this.service.updateStatus(id, dto.status); }

  @Patch(':id/toggle-recording')
  @ApiOperation({ summary: 'Toggle camera recording' })
  async toggleRecording(@Param('id') id: string) { return this.service.toggleRecording(id); }

  @Patch('bulk-status')
  @ApiOperation({ summary: 'Bulk update camera status' })
  async bulkUpdateStatus(@Body() dto: BulkUpdateStatusDto) { return this.service.bulkUpdateStatus(dto.cameraIds, dto.status); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete camera' })
  async delete(@Param('id') id: string) { await this.service.delete(id); return { message: 'Camera deleted' }; }
}
