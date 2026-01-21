import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateChecklistDto, CreateTrainingDto } from './dto/create-operations.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post('checklists')
  createChecklist(@Body() dto: CreateChecklistDto) {
    return this.operationsService.createChecklist(dto);
  }

  @Get('checklists')
  findAllChecklists(@Query('siteId') siteId?: string) {
    if (siteId) {
      return this.operationsService.findChecklistsBySite(siteId);
    }
    return this.operationsService.findAllChecklists();
  }

  @Get('checklists/:id')
  findChecklist(@Param('id') id: string) {
    return this.operationsService.findChecklist(id);
  }

  @Post('trainings')
  createTraining(@Body() dto: CreateTrainingDto) {
    return this.operationsService.createTraining(dto);
  }

  @Get('trainings')
  findAllTrainings() {
    return this.operationsService.findAllTrainings();
  }

  @Get('trainings/:id')
  findTraining(@Param('id') id: string) {
    return this.operationsService.findTraining(id);
  }

  @Post('guard-trainings')
  assignTrainingToGuard(
    @Body('guardId') guardId: string,
    @Body('guardName') guardName: string,
    @Body('trainingId') trainingId: string,
    @Body('dueDate') dueDate: Date,
  ) {
    return this.operationsService.assignTrainingToGuard(guardId, guardName, trainingId, dueDate);
  }

  @Get('guard-trainings/:guardId')
  findGuardTrainings(@Param('guardId') guardId: string) {
    return this.operationsService.findGuardTrainings(guardId);
  }
}
