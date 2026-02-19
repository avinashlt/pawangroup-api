import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendance, AttendanceDocument } from '../../schemas/attendance.schema';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(createDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = new this.attendanceModel({
      ...createDto,
      guardId: new Types.ObjectId(createDto.guardId),
    });
    return attendance.save();
  }

  async findAll(filterDto?: AttendanceFilterDto): Promise<Attendance[]> {
    const query: any = {};

    if (filterDto) {
      if (filterDto.date) query.date = filterDto.date;
      if (filterDto.startDate && filterDto.endDate) {
        query.date = { $gte: filterDto.startDate, $lte: filterDto.endDate };
      } else if (filterDto.startDate) {
        query.date = { $gte: filterDto.startDate };
      } else if (filterDto.endDate) {
        query.date = { $lte: filterDto.endDate };
      }
      if (filterDto.guardId) query.guardId = new Types.ObjectId(filterDto.guardId);
      if (filterDto.site) query.site = { $regex: filterDto.site, $options: 'i' };
      if (filterDto.status) query.status = filterDto.status;
      if (filterDto.shift) query.shift = filterDto.shift;
    }

    return this.attendanceModel.find(query).sort({ date: -1, guardName: 1 });
  }

  async findByDate(date: string): Promise<Attendance[]> {
    return this.attendanceModel.find({ date }).sort({ guardName: 1 });
  }

  async findByGuard(guardId: string, startDate?: string, endDate?: string): Promise<Attendance[]> {
    const query: any = { guardId: new Types.ObjectId(guardId) };
    
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.date = { $gte: startDate };
    } else if (endDate) {
      query.date = { $lte: endDate };
    }

    return this.attendanceModel.find(query).sort({ date: -1 });
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id);
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return attendance;
  }

  async update(id: string, updateDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.attendanceModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true },
    );
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return attendance;
  }

  async checkIn(guardId: string, guardName: string, site: string, shift: string, location?: { latitude: number; longitude: number }): Promise<Attendance> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Check if already checked in today
    const existing = await this.attendanceModel.findOne({
      guardId: new Types.ObjectId(guardId),
      date: today,
    });

    if (existing) {
      // Update existing record
      existing.checkIn = now;
      existing.checkInLocation = location;
      existing.status = this.determineStatus(now, shift);
      return existing.save();
    }

    // Create new attendance record
    const attendance = new this.attendanceModel({
      guardId: new Types.ObjectId(guardId),
      guardName,
      date: today,
      checkIn: now,
      checkInLocation: location,
      status: this.determineStatus(now, shift),
      site,
      shift,
    });

    return attendance.save();
  }

  async checkOut(guardId: string, location?: { latitude: number; longitude: number }): Promise<Attendance> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const attendance = await this.attendanceModel.findOne({
      guardId: new Types.ObjectId(guardId),
      date: today,
    });

    if (!attendance) {
      throw new NotFoundException('No check-in record found for today');
    }

    attendance.checkOut = now;
    attendance.checkOutLocation = location;
    
    // Calculate work hours if check-in exists
    if (attendance.checkIn) {
      attendance.workHours = this.calculateWorkHours(attendance.checkIn, now);
    }

    return attendance.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.attendanceModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
  }

  async getStatsByDate(date: string): Promise<{ present: number; absent: number; late: number; onLeave: number }> {
    const attendance = await this.attendanceModel.find({ date });
    
    return {
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      late: attendance.filter(a => a.status === 'late').length,
      onLeave: attendance.filter(a => a.status === 'on-leave').length,
    };
  }

  async getMonthlyReport(guardId: string, year: number, month: number): Promise<{
    totalDays: number;
    present: number;
    absent: number;
    late: number;
    onLeave: number;
    totalWorkHours: number;
  }> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    const attendance = await this.findByGuard(guardId, startDate, endDate);

    return {
      totalDays: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      late: attendance.filter(a => a.status === 'late').length,
      onLeave: attendance.filter(a => a.status === 'on-leave').length,
      totalWorkHours: attendance.reduce((sum, a) => sum + (a.workHours || 0), 0),
    };
  }

  private determineStatus(checkInTime: string, shift: string): string {
    // Simple logic - can be enhanced based on shift timings
    const shiftStartTimes: Record<string, number> = {
      morning: 8, // 8 AM
      evening: 14, // 2 PM
      night: 22, // 10 PM
    };

    const checkInHour = parseInt(checkInTime.split(':')[0]);
    const shiftStart = shiftStartTimes[shift] || 8;
    const graceMinutes = 15; // 15 minutes grace period

    // If more than 15 minutes late
    if (checkInHour > shiftStart || (checkInHour === shiftStart && parseInt(checkInTime.split(':')[1]) > graceMinutes)) {
      return 'late';
    }

    return 'present';
  }

  private calculateWorkHours(checkIn: string, checkOut: string): number {
    // Parse times (assuming format like "08:00 AM")
    const parseTime = (time: string): number => {
      const [timePart, period] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const startMinutes = parseTime(checkIn);
    const endMinutes = parseTime(checkOut);
    const diffMinutes = endMinutes - startMinutes;

    return Math.round((diffMinutes / 60) * 100) / 100;
  }
}
