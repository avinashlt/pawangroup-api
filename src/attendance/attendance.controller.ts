import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  findAll(
    @Query('guardId') guardId?: string,
    @Query('date') date?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('site') site?: string,
    @Query('status') status?: 'present' | 'absent' | 'late' | 'on-leave',
  ) {
    if (guardId) {
      return this.attendanceService.findByGuard(guardId);
    }
    if (date) {
      return this.attendanceService.findByDate(new Date(date));
    }
    if (startDate && endDate) {
      return this.attendanceService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    if (site) {
      return this.attendanceService.findBySite(site);
    }
    if (status) {
      return this.attendanceService.findByStatus(status);
    }
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}
