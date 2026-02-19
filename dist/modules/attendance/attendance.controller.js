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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("./attendance.service");
const attendance_dto_1 = require("./dto/attendance.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async create(createDto) {
        return this.attendanceService.create(createDto);
    }
    async findAll(filterDto) {
        return this.attendanceService.findAll(filterDto);
    }
    async getTodayAttendance() {
        const today = new Date().toISOString().split('T')[0];
        return this.attendanceService.findByDate(today);
    }
    async getByDate(date) {
        return this.attendanceService.findByDate(date);
    }
    async getByGuard(guardId, startDate, endDate) {
        return this.attendanceService.findByGuard(guardId, startDate, endDate);
    }
    async getStatsByDate(date) {
        return this.attendanceService.getStatsByDate(date);
    }
    async getMonthlyReport(guardId, year, month) {
        return this.attendanceService.getMonthlyReport(guardId, year, month);
    }
    async checkIn(checkInDto) {
        return this.attendanceService.checkIn(checkInDto.guardId, checkInDto.guardName, checkInDto.site, checkInDto.shift, checkInDto.location);
    }
    async checkOut(checkOutDto) {
        return this.attendanceService.checkOut(checkOutDto.guardId, checkOutDto.location);
    }
    async findOne(id) {
        return this.attendanceService.findOne(id);
    }
    async update(id, updateDto) {
        return this.attendanceService.update(id, updateDto);
    }
    async remove(id) {
        await this.attendanceService.remove(id);
        return { message: 'Attendance record deleted successfully' };
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attendance record created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all attendance records with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of attendance records' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: false, description: 'Filter by specific date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Start date for range (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'End date for range (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'guardId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'site', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['present', 'absent', 'late', 'on-leave'] }),
    (0, swagger_1.ApiQuery)({ name: 'shift', required: false, enum: ['morning', 'evening', 'night'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.AttendanceFilterDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiOperation)({ summary: 'Get today\'s attendance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Today\'s attendance records' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getTodayAttendance", null);
__decorate([
    (0, common_1.Get)('date/:date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance by date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance records for date' }),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByDate", null);
__decorate([
    (0, common_1.Get)('guard/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance history for a guard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Guard attendance history' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    __param(0, (0, common_1.Param)('guardId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getByGuard", null);
__decorate([
    (0, common_1.Get)('stats/:date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance statistics for a date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance statistics' }),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStatsByDate", null);
__decorate([
    (0, common_1.Get)('monthly-report/:guardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly attendance report for a guard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monthly attendance report' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true, type: Number }),
    __param(0, (0, common_1.Param)('guardId')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getMonthlyReport", null);
__decorate([
    (0, common_1.Post)('check-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Record guard check-in' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Check-in recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CheckInDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)('check-out'),
    (0, swagger_1.ApiOperation)({ summary: 'Record guard check-out' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Check-out recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CheckOutDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance record by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record updated' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('attendance'),
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map