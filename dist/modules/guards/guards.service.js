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
exports.GuardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const guard_schema_1 = require("../../schemas/guard.schema");
let GuardsService = class GuardsService {
    constructor(guardModel) {
        this.guardModel = guardModel;
    }
    async create(createGuardDto) {
        const guard = new this.guardModel(createGuardDto);
        return guard.save();
    }
    async findAll(filterDto) {
        const query = {};
        if (filterDto) {
            if (filterDto.status)
                query.status = filterDto.status;
            if (filterDto.shift)
                query.shift = filterDto.shift;
            if (filterDto.assignedSite)
                query.assignedSite = { $regex: filterDto.assignedSite, $options: 'i' };
            if (filterDto.search) {
                query.$or = [
                    { name: { $regex: filterDto.search, $options: 'i' } },
                    { employeeId: { $regex: filterDto.search, $options: 'i' } },
                    { phone: { $regex: filterDto.search, $options: 'i' } },
                ];
            }
        }
        return this.guardModel.find(query).sort({ name: 1 });
    }
    async findOne(id) {
        const guard = await this.guardModel.findById(id);
        if (!guard) {
            throw new common_1.NotFoundException(`Guard with ID ${id} not found`);
        }
        return guard;
    }
    async findByEmployeeId(employeeId) {
        const guard = await this.guardModel.findOne({ employeeId });
        if (!guard) {
            throw new common_1.NotFoundException(`Guard with employee ID ${employeeId} not found`);
        }
        return guard;
    }
    async update(id, updateGuardDto) {
        const guard = await this.guardModel.findByIdAndUpdate(id, { $set: updateGuardDto }, { new: true });
        if (!guard) {
            throw new common_1.NotFoundException(`Guard with ID ${id} not found`);
        }
        return guard;
    }
    async remove(id) {
        const result = await this.guardModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException(`Guard with ID ${id} not found`);
        }
    }
    async updateStatus(id, status) {
        const guard = await this.guardModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!guard) {
            throw new common_1.NotFoundException(`Guard with ID ${id} not found`);
        }
        return guard;
    }
    async getActiveGuards() {
        return this.guardModel.find({ status: 'active' }).sort({ name: 1 });
    }
    async getGuardsBySite(site) {
        return this.guardModel.find({
            assignedSite: { $regex: site, $options: 'i' },
            status: 'active',
        }).sort({ name: 1 });
    }
    async getGuardsByShift(shift) {
        return this.guardModel.find({
            shift,
            status: 'active',
        }).sort({ name: 1 });
    }
    async getCount() {
        return this.guardModel.countDocuments();
    }
    async getCountByStatus() {
        const result = await this.guardModel.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);
        return result.map(item => ({ status: item._id, count: item.count }));
    }
};
exports.GuardsService = GuardsService;
exports.GuardsService = GuardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(guard_schema_1.Guard.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GuardsService);
//# sourceMappingURL=guards.service.js.map