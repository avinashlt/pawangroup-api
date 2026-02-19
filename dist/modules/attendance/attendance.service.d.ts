import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from '../../schemas/attendance.schema';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto } from './dto/attendance.dto';
export declare class AttendanceService {
    private attendanceModel;
    constructor(attendanceModel: Model<AttendanceDocument>);
    create(createDto: CreateAttendanceDto): Promise<Attendance>;
    findAll(filterDto?: AttendanceFilterDto): Promise<Attendance[]>;
    findByDate(date: string): Promise<Attendance[]>;
    findByGuard(guardId: string, startDate?: string, endDate?: string): Promise<Attendance[]>;
    findOne(id: string): Promise<Attendance>;
    update(id: string, updateDto: UpdateAttendanceDto): Promise<Attendance>;
    checkIn(guardId: string, guardName: string, site: string, shift: string, location?: {
        latitude: number;
        longitude: number;
    }): Promise<Attendance>;
    checkOut(guardId: string, location?: {
        latitude: number;
        longitude: number;
    }): Promise<Attendance>;
    remove(id: string): Promise<void>;
    getStatsByDate(date: string): Promise<{
        present: number;
        absent: number;
        late: number;
        onLeave: number;
    }>;
    getMonthlyReport(guardId: string, year: number, month: number): Promise<{
        totalDays: number;
        present: number;
        absent: number;
        late: number;
        onLeave: number;
        totalWorkHours: number;
    }>;
    private determineStatus;
    private calculateWorkHours;
}
