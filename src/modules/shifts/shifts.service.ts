import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shift, ShiftDocument, ShiftTemplate, ShiftTemplateDocument, ShiftSwapRequest, ShiftSwapRequestDocument, TimeOffRequest, TimeOffRequestDocument } from '../../schemas/shift.schema';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift.name) private shiftModel: Model<ShiftDocument>,
    @InjectModel(ShiftTemplate.name) private templateModel: Model<ShiftTemplateDocument>,
    @InjectModel(ShiftSwapRequest.name) private swapModel: Model<ShiftSwapRequestDocument>,
    @InjectModel(TimeOffRequest.name) private timeOffModel: Model<TimeOffRequestDocument>,
  ) {}

  // Shifts
  async createShift(data: any): Promise<Shift> {
    const shift = new this.shiftModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      siteId: new Types.ObjectId(data.siteId as any),
    });
    return shift.save();
  }

  async findShifts(guardId?: string, siteId?: string, date?: string): Promise<Shift[]> {
    const query: any = {};
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (date) query.date = date;
    return this.shiftModel.find(query).sort({ date: 1, startTime: 1 });
  }

  async findShiftById(id: string): Promise<Shift> {
    const shift = await this.shiftModel.findById(id);
    if (!shift) throw new NotFoundException(`Shift ${id} not found`);
    return shift;
  }

  async updateShift(id: string, data: any): Promise<Shift> {
    const shift = await this.shiftModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!shift) throw new NotFoundException(`Shift ${id} not found`);
    return shift;
  }

  async deleteShift(id: string): Promise<void> {
    const result = await this.shiftModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Shift ${id} not found`);
  }

  // Templates
  async createTemplate(data: any): Promise<ShiftTemplate> {
    const template = new this.templateModel(data);
    return template.save();
  }

  async findTemplates(siteId?: string): Promise<ShiftTemplate[]> {
    const query = siteId ? { siteId: new Types.ObjectId(siteId) } : {};
    return this.templateModel.find(query);
  }

  async updateTemplate(id: string, data: any): Promise<ShiftTemplate> {
    const template = await this.templateModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!template) throw new NotFoundException(`Template ${id} not found`);
    return template;
  }

  async deleteTemplate(id: string): Promise<void> {
    const result = await this.templateModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Template ${id} not found`);
  }

  // Swap requests
  async createSwapRequest(data: any): Promise<ShiftSwapRequest> {
    const request = new this.swapModel({
      ...data,
      requesterId: new Types.ObjectId(data.requesterId as any),
      targetGuardId: new Types.ObjectId(data.targetGuardId as any),
      shiftId: new Types.ObjectId(data.shiftId as any),
      status: 'pending',
      requestDate: new Date(),
    });
    return request.save();
  }

  async findSwapRequests(guardId?: string, status?: string): Promise<ShiftSwapRequest[]> {
    const query: any = {};
    if (guardId) query.$or = [{ requesterId: new Types.ObjectId(guardId) }, { targetGuardId: new Types.ObjectId(guardId) }];
    if (status) query.status = status;
    return this.swapModel.find(query).sort({ requestDate: -1 });
  }

  async updateSwapRequest(id: string, status: string, approvedBy?: string): Promise<ShiftSwapRequest> {
    const request = await this.swapModel.findByIdAndUpdate(id, { status, approvedBy, responseDate: new Date() }, { new: true });
    if (!request) throw new NotFoundException(`Swap request ${id} not found`);
    return request;
  }

  // Time-off requests
  async createTimeOffRequest(data: any): Promise<TimeOffRequest> {
    const request = new this.timeOffModel({
      ...data,
      guardId: new Types.ObjectId(data.guardId as any),
      status: 'pending',
      requestDate: new Date(),
    });
    return request.save();
  }

  async findTimeOffRequests(guardId?: string, status?: string): Promise<TimeOffRequest[]> {
    const query: any = {};
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (status) query.status = status;
    return this.timeOffModel.find(query).sort({ requestDate: -1 });
  }

  async updateTimeOffRequest(id: string, status: string, approvedBy?: string): Promise<TimeOffRequest> {
    const request = await this.timeOffModel.findByIdAndUpdate(id, { status, approvedBy, responseDate: new Date() }, { new: true });
    if (!request) throw new NotFoundException(`Time-off request ${id} not found`);
    return request;
  }
}
