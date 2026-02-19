import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto, CheckInDto, CheckOutDto } from './dto/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createDto: CreateAttendanceDto): Promise<import("../../schemas/attendance.schema").Attendance>;
    findAll(filterDto: AttendanceFilterDto): Promise<import("../../schemas/attendance.schema").Attendance[]>;
    getTodayAttendance(): Promise<import("../../schemas/attendance.schema").Attendance[]>;
    getByDate(date: string): Promise<import("../../schemas/attendance.schema").Attendance[]>;
    getByGuard(guardId: string, startDate?: string, endDate?: string): Promise<import("../../schemas/attendance.schema").Attendance[]>;
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
    checkIn(checkInDto: CheckInDto): Promise<import("../../schemas/attendance.schema").Attendance>;
    checkOut(checkOutDto: CheckOutDto): Promise<import("../../schemas/attendance.schema").Attendance>;
    findOne(id: string): Promise<import("../../schemas/attendance.schema").Attendance>;
    update(id: string, updateDto: UpdateAttendanceDto): Promise<import("../../schemas/attendance.schema").Attendance>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
