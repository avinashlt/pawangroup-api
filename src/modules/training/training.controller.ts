import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTrainingDto, UpdateTrainingDto, AssignTrainingDto, CompleteTrainingDto, UpdateProgressDto } from './dto/training.dto';

@ApiTags('training')
@Controller('training')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  // Training courses
  @Post()
  @ApiOperation({ summary: 'Create training course' })
  async createTraining(@Body() dto: CreateTrainingDto) { return this.service.createTraining(dto); }

  @Get()
  @ApiOperation({ summary: 'Get training courses' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  async findTrainings(@Query('type') type?: string, @Query('isActive') isActive?: boolean) { return this.service.findTrainings(type, isActive); }

  @Get('metrics')
  @ApiOperation({ summary: 'Get training metrics' })
  @ApiQuery({ name: 'guardId', required: false })
  async getTrainingMetrics(@Query('guardId') guardId?: string) { return this.service.getTrainingMetrics(guardId); }

  @Get('overdue')
  @ApiOperation({ summary: 'Get overdue trainings' })
  async getOverdueTrainings() { return this.service.getOverdueTrainings(); }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming trainings' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  async getUpcomingTrainings(@Query('days') days?: number) { return this.service.getUpcomingTrainings(days); }

  @Get(':id')
  @ApiOperation({ summary: 'Get training by ID' })
  async findTrainingById(@Param('id') id: string) { return this.service.findTrainingById(id); }

  @Put(':id')
  @ApiOperation({ summary: 'Update training course' })
  async updateTraining(@Param('id') id: string, @Body() dto: UpdateTrainingDto) { return this.service.updateTraining(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete training course' })
  async deleteTraining(@Param('id') id: string) { await this.service.deleteTraining(id); return { message: 'Training deleted' }; }

  // Guard training assignments
  @Post('assignments')
  @ApiOperation({ summary: 'Assign training to guard' })
  async assignTraining(@Body() dto: AssignTrainingDto) { return this.service.assignTraining(dto); }

  @Get('assignments')
  @ApiOperation({ summary: 'Get guard training assignments' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'trainingId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findGuardTrainings(@Query('guardId') guardId?: string, @Query('trainingId') trainingId?: string, @Query('status') status?: string) {
    return this.service.findGuardTrainings(guardId, trainingId, status);
  }

  @Get('assignments/:id')
  @ApiOperation({ summary: 'Get guard training assignment by ID' })
  async findGuardTrainingById(@Param('id') id: string) { return this.service.findGuardTrainingById(id); }

  @Patch('assignments/:id/start')
  @ApiOperation({ summary: 'Start training' })
  async startTraining(@Param('id') id: string) { return this.service.startTraining(id); }

  @Patch('assignments/:id/complete')
  @ApiOperation({ summary: 'Complete training' })
  async completeTraining(@Param('id') id: string, @Body() dto: CompleteTrainingDto) { return this.service.completeTraining(id, dto.score); }

  @Patch('assignments/:id/progress')
  @ApiOperation({ summary: 'Update training progress' })
  async updateProgress(@Param('id') id: string, @Body() dto: UpdateProgressDto) { return this.service.updateProgress(id, dto.progress); }
}
