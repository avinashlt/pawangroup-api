import { ShiftsService } from './shifts.service';
import { CreateShiftDto, UpdateShiftDto, CreateTemplateDto, UpdateTemplateDto, CreateSwapRequestDto, UpdateSwapRequestDto, CreateTimeOffRequestDto, UpdateTimeOffRequestDto } from './dto/shifts.dto';
export declare class ShiftsController {
    private readonly service;
    constructor(service: ShiftsService);
    createShift(dto: CreateShiftDto): Promise<import("../../schemas/shift.schema").ScheduledShift>;
    findShifts(guardId?: string, siteId?: string, date?: string): Promise<import("../../schemas/shift.schema").ScheduledShift[]>;
    findShiftById(id: string): Promise<import("../../schemas/shift.schema").ScheduledShift>;
    updateShift(id: string, dto: UpdateShiftDto): Promise<import("../../schemas/shift.schema").ScheduledShift>;
    deleteShift(id: string): Promise<{
        message: string;
    }>;
    createTemplate(dto: CreateTemplateDto): Promise<import("../../schemas/shift.schema").ShiftTemplate>;
    findTemplates(siteId?: string): Promise<import("../../schemas/shift.schema").ShiftTemplate[]>;
    updateTemplate(id: string, dto: UpdateTemplateDto): Promise<import("../../schemas/shift.schema").ShiftTemplate>;
    deleteTemplate(id: string): Promise<{
        message: string;
    }>;
    createSwapRequest(dto: CreateSwapRequestDto): Promise<import("../../schemas/shift.schema").ShiftSwapRequest>;
    findSwapRequests(guardId?: string, status?: string): Promise<import("../../schemas/shift.schema").ShiftSwapRequest[]>;
    updateSwapRequest(id: string, dto: UpdateSwapRequestDto): Promise<import("../../schemas/shift.schema").ShiftSwapRequest>;
    createTimeOffRequest(dto: CreateTimeOffRequestDto): Promise<import("../../schemas/shift.schema").TimeOffRequest>;
    findTimeOffRequests(guardId?: string, status?: string): Promise<import("../../schemas/shift.schema").TimeOffRequest[]>;
    updateTimeOffRequest(id: string, dto: UpdateTimeOffRequestDto): Promise<import("../../schemas/shift.schema").TimeOffRequest>;
}
