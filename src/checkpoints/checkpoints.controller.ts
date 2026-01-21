import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { CreateCheckpointDto, CreateCheckpointScanDto } from './dto/create-checkpoint.dto';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @Post()
  createCheckpoint(@Body() dto: CreateCheckpointDto) {
    return this.checkpointsService.createCheckpoint(dto);
  }

  @Get()
  findAllCheckpoints(@Query('siteId') siteId?: string) {
    if (siteId) {
      return this.checkpointsService.findCheckpointsBySite(siteId);
    }
    return this.checkpointsService.findAllCheckpoints();
  }

  @Get(':id')
  findCheckpoint(@Param('id') id: string) {
    return this.checkpointsService.findCheckpoint(id);
  }

  @Post('scans')
  createScan(@Body() dto: CreateCheckpointScanDto) {
    return this.checkpointsService.createScan(dto);
  }

  @Get('scans/all')
  findAllScans(@Query('checkpointId') checkpointId?: string, @Query('guardId') guardId?: string) {
    if (checkpointId) {
      return this.checkpointsService.findScansByCheckpoint(checkpointId);
    }
    if (guardId) {
      return this.checkpointsService.findScansByGuard(guardId);
    }
    return this.checkpointsService.findAllScans();
  }
}
