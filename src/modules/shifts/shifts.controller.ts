import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateShiftDto, UpdateShiftDto, CreateTemplateDto, UpdateTemplateDto, CreateSwapRequestDto, UpdateSwapRequestDto, CreateTimeOffRequestDto, UpdateTimeOffRequestDto } from './dto/shifts.dto';

@ApiTags('shifts')
@Controller('shifts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ShiftsController {
  constructor(private readonly service: ShiftsService) {}

  // Shifts
  @Post()
  @ApiOperation({ summary: 'Create shift' })
  async createShift(@Body() dto: CreateShiftDto) { return this.service.createShift(dto); }

  @Get()
  @ApiOperation({ summary: 'Get shifts' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'date', required: false })
  async findShifts(@Query('guardId') guardId?: string, @Query('siteId') siteId?: string, @Query('date') date?: string) {
    return this.service.findShifts(guardId, siteId, date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shift by ID' })
  async findShiftById(@Param('id') id: string) { return this.service.findShiftById(id); }

  @Put(':id')
  @ApiOperation({ summary: 'Update shift' })
  async updateShift(@Param('id') id: string, @Body() dto: UpdateShiftDto) { return this.service.updateShift(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shift' })
  async deleteShift(@Param('id') id: string) { await this.service.deleteShift(id); return { message: 'Shift deleted' }; }

  // Templates
  @Post('templates')
  @ApiOperation({ summary: 'Create shift template' })
  async createTemplate(@Body() dto: CreateTemplateDto) { return this.service.createTemplate(dto); }

  @Get('templates')
  @ApiOperation({ summary: 'Get shift templates' })
  @ApiQuery({ name: 'siteId', required: false })
  async findTemplates(@Query('siteId') siteId?: string) { return this.service.findTemplates(siteId); }

  @Put('templates/:id')
  @ApiOperation({ summary: 'Update shift template' })
  async updateTemplate(@Param('id') id: string, @Body() dto: UpdateTemplateDto) { return this.service.updateTemplate(id, dto); }

  @Delete('templates/:id')
  @ApiOperation({ summary: 'Delete shift template' })
  async deleteTemplate(@Param('id') id: string) { await this.service.deleteTemplate(id); return { message: 'Template deleted' }; }

  // Swap requests
  @Post('swap-requests')
  @ApiOperation({ summary: 'Create shift swap request' })
  async createSwapRequest(@Body() dto: CreateSwapRequestDto) { return this.service.createSwapRequest(dto); }

  @Get('swap-requests')
  @ApiOperation({ summary: 'Get shift swap requests' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findSwapRequests(@Query('guardId') guardId?: string, @Query('status') status?: string) { return this.service.findSwapRequests(guardId, status); }

  @Patch('swap-requests/:id')
  @ApiOperation({ summary: 'Update shift swap request status' })
  async updateSwapRequest(@Param('id') id: string, @Body() dto: UpdateSwapRequestDto) { return this.service.updateSwapRequest(id, dto.status, dto.approvedBy); }

  // Time-off requests
  @Post('time-off-requests')
  @ApiOperation({ summary: 'Create time-off request' })
  async createTimeOffRequest(@Body() dto: CreateTimeOffRequestDto) { return this.service.createTimeOffRequest(dto); }

  @Get('time-off-requests')
  @ApiOperation({ summary: 'Get time-off requests' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findTimeOffRequests(@Query('guardId') guardId?: string, @Query('status') status?: string) { return this.service.findTimeOffRequests(guardId, status); }

  @Patch('time-off-requests/:id')
  @ApiOperation({ summary: 'Update time-off request status' })
  async updateTimeOffRequest(@Param('id') id: string, @Body() dto: UpdateTimeOffRequestDto) { return this.service.updateTimeOffRequest(id, dto.status, dto.approvedBy); }
}
