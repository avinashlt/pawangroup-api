import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(attendance);
  }

  async findAll(): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({ where: { id } });
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }
    return attendance;
  }

  async findByGuard(guardId: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { guardId },
      order: { date: 'DESC' },
    });
  }

  async findByDate(date: Date): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { date },
      order: { guardName: 'ASC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: { date: 'DESC', guardName: 'ASC' },
    });
  }

  async findBySite(site: string): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { site },
      order: { date: 'DESC' },
    });
  }

  async findByStatus(status: 'present' | 'absent' | 'late' | 'on-leave'): Promise<Attendance[]> {
    return await this.attendanceRepository.find({
      where: { status },
      order: { date: 'DESC' },
    });
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.findOne(id);
    Object.assign(attendance, updateAttendanceDto);
    return await this.attendanceRepository.save(attendance);
  }

  async remove(id: string): Promise<void> {
    const attendance = await this.findOne(id);
    await this.attendanceRepository.remove(attendance);
  }
}
