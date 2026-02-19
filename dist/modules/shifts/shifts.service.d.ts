import { Model } from 'mongoose';
import { Shift, ShiftDocument, ShiftTemplate, ShiftTemplateDocument, ShiftSwapRequest, ShiftSwapRequestDocument, TimeOffRequest, TimeOffRequestDocument } from '../../schemas/shift.schema';
export declare class ShiftsService {
    private shiftModel;
    private templateModel;
    private swapModel;
    private timeOffModel;
    constructor(shiftModel: Model<ShiftDocument>, templateModel: Model<ShiftTemplateDocument>, swapModel: Model<ShiftSwapRequestDocument>, timeOffModel: Model<TimeOffRequestDocument>);
    createShift(data: any): Promise<Shift>;
    findShifts(guardId?: string, siteId?: string, date?: string): Promise<Shift[]>;
    findShiftById(id: string): Promise<Shift>;
    updateShift(id: string, data: any): Promise<Shift>;
    deleteShift(id: string): Promise<void>;
    createTemplate(data: any): Promise<ShiftTemplate>;
    findTemplates(siteId?: string): Promise<ShiftTemplate[]>;
    updateTemplate(id: string, data: any): Promise<ShiftTemplate>;
    deleteTemplate(id: string): Promise<void>;
    createSwapRequest(data: any): Promise<ShiftSwapRequest>;
    findSwapRequests(guardId?: string, status?: string): Promise<ShiftSwapRequest[]>;
    updateSwapRequest(id: string, status: string, approvedBy?: string): Promise<ShiftSwapRequest>;
    createTimeOffRequest(data: any): Promise<TimeOffRequest>;
    findTimeOffRequests(guardId?: string, status?: string): Promise<TimeOffRequest[]>;
    updateTimeOffRequest(id: string, status: string, approvedBy?: string): Promise<TimeOffRequest>;
}
