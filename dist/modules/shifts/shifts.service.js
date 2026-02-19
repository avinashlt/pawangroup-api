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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const shift_schema_1 = require("../../schemas/shift.schema");
let ShiftsService = class ShiftsService {
    constructor(shiftModel, templateModel, swapModel, timeOffModel) {
        this.shiftModel = shiftModel;
        this.templateModel = templateModel;
        this.swapModel = swapModel;
        this.timeOffModel = timeOffModel;
    }
    async createShift(data) {
        const shift = new this.shiftModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
        });
        return shift.save();
    }
    async findShifts(guardId, siteId, date) {
        const query = {};
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (date)
            query.date = date;
        return this.shiftModel.find(query).sort({ date: 1, startTime: 1 });
    }
    async findShiftById(id) {
        const shift = await this.shiftModel.findById(id);
        if (!shift)
            throw new common_1.NotFoundException(`Shift ${id} not found`);
        return shift;
    }
    async updateShift(id, data) {
        const shift = await this.shiftModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!shift)
            throw new common_1.NotFoundException(`Shift ${id} not found`);
        return shift;
    }
    async deleteShift(id) {
        const result = await this.shiftModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Shift ${id} not found`);
    }
    async createTemplate(data) {
        const template = new this.templateModel(data);
        return template.save();
    }
    async findTemplates(siteId) {
        const query = siteId ? { siteId: new mongoose_2.Types.ObjectId(siteId) } : {};
        return this.templateModel.find(query);
    }
    async updateTemplate(id, data) {
        const template = await this.templateModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!template)
            throw new common_1.NotFoundException(`Template ${id} not found`);
        return template;
    }
    async deleteTemplate(id) {
        const result = await this.templateModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Template ${id} not found`);
    }
    async createSwapRequest(data) {
        const request = new this.swapModel({
            ...data,
            requesterId: new mongoose_2.Types.ObjectId(data.requesterId),
            targetGuardId: new mongoose_2.Types.ObjectId(data.targetGuardId),
            shiftId: new mongoose_2.Types.ObjectId(data.shiftId),
            status: 'pending',
            requestDate: new Date(),
        });
        return request.save();
    }
    async findSwapRequests(guardId, status) {
        const query = {};
        if (guardId)
            query.$or = [{ requesterId: new mongoose_2.Types.ObjectId(guardId) }, { targetGuardId: new mongoose_2.Types.ObjectId(guardId) }];
        if (status)
            query.status = status;
        return this.swapModel.find(query).sort({ requestDate: -1 });
    }
    async updateSwapRequest(id, status, approvedBy) {
        const request = await this.swapModel.findByIdAndUpdate(id, { status, approvedBy, responseDate: new Date() }, { new: true });
        if (!request)
            throw new common_1.NotFoundException(`Swap request ${id} not found`);
        return request;
    }
    async createTimeOffRequest(data) {
        const request = new this.timeOffModel({
            ...data,
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            status: 'pending',
            requestDate: new Date(),
        });
        return request.save();
    }
    async findTimeOffRequests(guardId, status) {
        const query = {};
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (status)
            query.status = status;
        return this.timeOffModel.find(query).sort({ requestDate: -1 });
    }
    async updateTimeOffRequest(id, status, approvedBy) {
        const request = await this.timeOffModel.findByIdAndUpdate(id, { status, approvedBy, responseDate: new Date() }, { new: true });
        if (!request)
            throw new common_1.NotFoundException(`Time-off request ${id} not found`);
        return request;
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(shift_schema_1.Shift.name)),
    __param(1, (0, mongoose_1.InjectModel)(shift_schema_1.ShiftTemplate.name)),
    __param(2, (0, mongoose_1.InjectModel)(shift_schema_1.ShiftSwapRequest.name)),
    __param(3, (0, mongoose_1.InjectModel)(shift_schema_1.TimeOffRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map