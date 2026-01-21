import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftTemplateDto, CreateScheduledShiftDto } from './dto/create-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post('templates')
  createTemplate(@Body() dto: CreateShiftTemplateDto) {
    return this.shiftsService.createTemplate(dto);
  }

  @Get('templates')
  findAllTemplates() {
    return this.shiftsService.findAllTemplates();
  }

  @Get('templates/:id')
  findTemplate(@Param('id') id: string) {
    return this.shiftsService.findTemplate(id);
  }

  @Post('scheduled')
  createScheduledShift(@Body() dto: CreateScheduledShiftDto) {
    return this.shiftsService.createScheduledShift(dto);
  }

  @Get('scheduled')
  findAllShifts(
    @Query('guardId') guardId?: string,
    @Query('date') date?: string,
    @Query('siteId') siteId?: string,
  ) {
    if (guardId) {
      return this.shiftsService.findShiftsByGuard(guardId);
    }
    if (date) {
      return this.shiftsService.findShiftsByDate(new Date(date));
    }
    if (siteId) {
      return this.shiftsService.findShiftsBySite(siteId);
    }
    return this.shiftsService.findAllShifts();
  }

  @Get('scheduled/:id')
  findShift(@Param('id') id: string) {
    return this.shiftsService.findShift(id);
  }

  @Patch('scheduled/:id/status')
  updateShiftStatus(
    @Param('id') id: string,
    @Body('status') status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled',
  ) {
    return this.shiftsService.updateShiftStatus(id, status);
  }
}
