import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto, CheckInDto, CheckOutDto } from './dto/attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create attendance record' })
  @ApiResponse({ status: 201, description: 'Attendance record created' })
  async create(@Body() createDto: CreateAttendanceDto) {
    return this.attendanceService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendance records with filters' })
  @ApiResponse({ status: 200, description: 'List of attendance records' })
  @ApiQuery({ name: 'date', required: false, description: 'Filter by specific date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date for range (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date for range (YYYY-MM-DD)' })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'site', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['present', 'absent', 'late', 'on-leave'] })
  @ApiQuery({ name: 'shift', required: false, enum: ['morning', 'evening', 'night'] })
  async findAll(@Query() filterDto: AttendanceFilterDto) {
    return this.attendanceService.findAll(filterDto);
  }

  @Get('today')
  @ApiOperation({ summary: 'Get today\'s attendance' })
  @ApiResponse({ status: 200, description: 'Today\'s attendance records' })
  async getTodayAttendance() {
    const today = new Date().toISOString().split('T')[0];
    return this.attendanceService.findByDate(today);
  }

  @Get('date/:date')
  @ApiOperation({ summary: 'Get attendance by date' })
  @ApiResponse({ status: 200, description: 'Attendance records for date' })
  async getByDate(@Param('date') date: string) {
    return this.attendanceService.findByDate(date);
  }

  @Get('guard/:guardId')
  @ApiOperation({ summary: 'Get attendance history for a guard' })
  @ApiResponse({ status: 200, description: 'Guard attendance history' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getByGuard(
    @Param('guardId') guardId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.attendanceService.findByGuard(guardId, startDate, endDate);
  }

  @Get('stats/:date')
  @ApiOperation({ summary: 'Get attendance statistics for a date' })
  @ApiResponse({ status: 200, description: 'Attendance statistics' })
  async getStatsByDate(@Param('date') date: string) {
    return this.attendanceService.getStatsByDate(date);
  }

  @Get('monthly-report/:guardId')
  @ApiOperation({ summary: 'Get monthly attendance report for a guard' })
  @ApiResponse({ status: 200, description: 'Monthly attendance report' })
  @ApiQuery({ name: 'year', required: true, type: Number })
  @ApiQuery({ name: 'month', required: true, type: Number })
  async getMonthlyReport(
    @Param('guardId') guardId: string,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.attendanceService.getMonthlyReport(guardId, year, month);
  }

  @Post('check-in')
  @ApiOperation({ summary: 'Record guard check-in' })
  @ApiResponse({ status: 201, description: 'Check-in recorded' })
  async checkIn(@Body() checkInDto: CheckInDto) {
    return this.attendanceService.checkIn(
      checkInDto.guardId,
      checkInDto.guardName,
      checkInDto.site,
      checkInDto.shift,
      checkInDto.location,
    );
  }

  @Post('check-out')
  @ApiOperation({ summary: 'Record guard check-out' })
  @ApiResponse({ status: 200, description: 'Check-out recorded' })
  async checkOut(@Body() checkOutDto: CheckOutDto) {
    return this.attendanceService.checkOut(checkOutDto.guardId, checkOutDto.location);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Attendance record' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attendance record' })
  @ApiResponse({ status: 200, description: 'Attendance record updated' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance record' })
  @ApiResponse({ status: 200, description: 'Attendance record deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async remove(@Param('id') id: string) {
    await this.attendanceService.remove(id);
    return { message: 'Attendance record deleted successfully' };
  }
}
