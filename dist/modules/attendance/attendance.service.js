"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("../../schemas/attendance.schema");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel) {
        this.attendanceModel = attendanceModel;
    }
    async create(createDto) {
        const attendance = new this.attendanceModel({
            ...createDto,
            guardId: new mongoose_2.Types.ObjectId(createDto.guardId),
        });
        return attendance.save();
    }
    async findAll(filterDto) {
        const query = {};
        if (filterDto) {
            if (filterDto.date)
                query.date = filterDto.date;
            if (filterDto.startDate && filterDto.endDate) {
                query.date = { $gte: filterDto.startDate, $lte: filterDto.endDate };
            }
            else if (filterDto.startDate) {
                query.date = { $gte: filterDto.startDate };
            }
            else if (filterDto.endDate) {
                query.date = { $lte: filterDto.endDate };
            }
            if (filterDto.guardId)
                query.guardId = new mongoose_2.Types.ObjectId(filterDto.guardId);
            if (filterDto.site)
                query.site = { $regex: filterDto.site, $options: 'i' };
            if (filterDto.status)
                query.status = filterDto.status;
            if (filterDto.shift)
                query.shift = filterDto.shift;
        }
        return this.attendanceModel.find(query).sort({ date: -1, guardName: 1 });
    }
    async findByDate(date) {
        return this.attendanceModel.find({ date }).sort({ guardName: 1 });
    }
    async findByGuard(guardId, startDate, endDate) {
        const query = { guardId: new mongoose_2.Types.ObjectId(guardId) };
        if (startDate && endDate) {
            query.date = { $gte: startDate, $lte: endDate };
        }
        else if (startDate) {
            query.date = { $gte: startDate };
        }
        else if (endDate) {
            query.date = { $lte: endDate };
        }
        return this.attendanceModel.find(query).sort({ date: -1 });
    }
    async findOne(id) {
        const attendance = await this.attendanceModel.findById(id);
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        return attendance;
    }
    async update(id, updateDto) {
        const attendance = await this.attendanceModel.findByIdAndUpdate(id, { $set: updateDto }, { new: true });
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        return attendance;
    }
    async checkIn(guardId, guardName, site, shift, location) {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const existing = await this.attendanceModel.findOne({
            guardId: new mongoose_2.Types.ObjectId(guardId),
            date: today,
        });
        if (existing) {
            existing.checkIn = now;
            existing.checkInLocation = location;
            existing.status = this.determineStatus(now, shift);
            return existing.save();
        }
        const attendance = new this.attendanceModel({
            guardId: new mongoose_2.Types.ObjectId(guardId),
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
    async checkOut(guardId, location) {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const attendance = await this.attendanceModel.findOne({
            guardId: new mongoose_2.Types.ObjectId(guardId),
            date: today,
        });
        if (!attendance) {
            throw new common_1.NotFoundException('No check-in record found for today');
        }
        attendance.checkOut = now;
        attendance.checkOutLocation = location;
        if (attendance.checkIn) {
            attendance.workHours = this.calculateWorkHours(attendance.checkIn, now);
        }
        return attendance.save();
    }
    async remove(id) {
        const result = await this.attendanceModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
    }
    async getStatsByDate(date) {
        const attendance = await this.attendanceModel.find({ date });
        return {
            present: attendance.filter(a => a.status === 'present').length,
            absent: attendance.filter(a => a.status === 'absent').length,
            late: attendance.filter(a => a.status === 'late').length,
            onLeave: attendance.filter(a => a.status === 'on-leave').length,
        };
    }
    async getMonthlyReport(guardId, year, month) {
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
    determineStatus(checkInTime, shift) {
        const shiftStartTimes = {
            morning: 8,
            evening: 14,
            night: 22,
        };
        const checkInHour = parseInt(checkInTime.split(':')[0]);
        const shiftStart = shiftStartTimes[shift] || 8;
        const graceMinutes = 15;
        if (checkInHour > shiftStart || (checkInHour === shiftStart && parseInt(checkInTime.split(':')[1]) > graceMinutes)) {
            return 'late';
        }
        return 'present';
    }
    calculateWorkHours(checkIn, checkOut) {
        const parseTime = (time) => {
            const [timePart, period] = time.split(' ');
            let [hours, minutes] = timePart.split(':').map(Number);
            if (period === 'PM' && hours !== 12)
                hours += 12;
            if (period === 'AM' && hours === 12)
                hours = 0;
            return hours * 60 + minutes;
        };
        const startMinutes = parseTime(checkIn);
        const endMinutes = parseTime(checkOut);
        const diffMinutes = endMinutes - startMinutes;
        return Math.round((diffMinutes / 60) * 100) / 100;
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map