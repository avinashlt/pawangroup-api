declare class LocationDto {
    latitude: number;
    longitude: number;
}
export declare class CreateAttendanceDto {
    guardId: string;
    guardName: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    status: string;
    site: string;
    shift: string;
    workHours?: number;
    notes?: string;
    checkInLocation?: LocationDto;
    checkOutLocation?: LocationDto;
}
declare const UpdateAttendanceDto_base: import("@nestjs/common").Type<Partial<CreateAttendanceDto>>;
export declare class UpdateAttendanceDto extends UpdateAttendanceDto_base {
}
export declare class AttendanceFilterDto {
    date?: string;
    startDate?: string;
    endDate?: string;
    guardId?: string;
    site?: string;
    status?: string;
    shift?: string;
}
export declare class CheckInDto {
    guardId: string;
    guardName: string;
    site: string;
    shift: string;
    location?: LocationDto;
}
export declare class CheckOutDto {
    guardId: string;
    location?: LocationDto;
}
export {};
