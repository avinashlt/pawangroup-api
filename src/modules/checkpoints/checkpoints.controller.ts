import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CheckpointsService } from './checkpoints.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCheckpointDto, UpdateCheckpointDto, RecordScanDto } from './dto/checkpoints.dto';

@ApiTags('checkpoints')
@Controller('checkpoints')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CheckpointsController {
  constructor(private readonly service: CheckpointsService) {}

  @Post()
  @ApiOperation({ summary: 'Create checkpoint' })
  async create(@Body() dto: CreateCheckpointDto) {
    return this.service.createCheckpoint(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all checkpoints' })
  @ApiQuery({ name: 'siteId', required: false })
  async findAll(@Query('siteId') siteId?: string) {
    return this.service.findAllCheckpoints(siteId);
  }

  @Get('missed')
  @ApiOperation({ summary: 'Get missed checkpoints' })
  @ApiQuery({ name: 'siteId', required: false })
  async getMissed(@Query('siteId') siteId?: string) {
    return this.service.getMissedScans(siteId);
  }

  @Get('scans')
  @ApiOperation({ summary: 'Get checkpoint scans' })
  @ApiQuery({ name: 'checkpointId', required: false })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getScans(
    @Query('checkpointId') checkpointId?: string,
    @Query('guardId') guardId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.service.getScans(checkpointId, guardId, limit || 50);
  }

  @Post('scan')
  @ApiOperation({ summary: 'Record checkpoint scan' })
  async recordScan(@Body() dto: RecordScanDto) {
    return this.service.recordScan(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get checkpoint by ID' })
  async findOne(@Param('id') id: string) {
    return this.service.findCheckpointById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update checkpoint' })
  async update(@Param('id') id: string, @Body() dto: UpdateCheckpointDto) {
    return this.service.updateCheckpoint(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete checkpoint' })
  async remove(@Param('id') id: string) {
    await this.service.deleteCheckpoint(id);
    return { message: 'Checkpoint deleted' };
  }
}
