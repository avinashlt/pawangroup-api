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
exports.ComplianceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const checklist_schema_1 = require("../../schemas/checklist.schema");
let ComplianceService = class ComplianceService {
    constructor(checklistModel, submissionModel) {
        this.checklistModel = checklistModel;
        this.submissionModel = submissionModel;
    }
    async createChecklist(data) {
        const checklist = new this.checklistModel(data);
        return checklist.save();
    }
    async findChecklists(siteId, type, isActive) {
        const query = {};
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (type)
            query.type = type;
        if (isActive !== undefined)
            query.isActive = isActive;
        return this.checklistModel.find(query).sort({ name: 1 });
    }
    async findChecklistById(id) {
        const checklist = await this.checklistModel.findById(id);
        if (!checklist)
            throw new common_1.NotFoundException(`Checklist ${id} not found`);
        return checklist;
    }
    async updateChecklist(id, data) {
        const checklist = await this.checklistModel.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!checklist)
            throw new common_1.NotFoundException(`Checklist ${id} not found`);
        return checklist;
    }
    async deleteChecklist(id) {
        const result = await this.checklistModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException(`Checklist ${id} not found`);
    }
    async submitChecklist(data) {
        const submission = new this.submissionModel({
            ...data,
            checklistId: new mongoose_2.Types.ObjectId(data.checklistId),
            guardId: new mongoose_2.Types.ObjectId(data.guardId),
            siteId: new mongoose_2.Types.ObjectId(data.siteId),
            submittedAt: new Date(),
            status: 'pending-review',
        });
        return submission.save();
    }
    async findSubmissions(checklistId, guardId, siteId, status) {
        const query = {};
        if (checklistId)
            query.checklistId = new mongoose_2.Types.ObjectId(checklistId);
        if (guardId)
            query.guardId = new mongoose_2.Types.ObjectId(guardId);
        if (siteId)
            query.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (status)
            query.status = status;
        return this.submissionModel.find(query).sort({ submittedAt: -1 });
    }
    async findSubmissionById(id) {
        const submission = await this.submissionModel.findById(id);
        if (!submission)
            throw new common_1.NotFoundException(`Submission ${id} not found`);
        return submission;
    }
    async reviewSubmission(id, status, reviewedBy, notes) {
        const submission = await this.submissionModel.findByIdAndUpdate(id, { status, reviewedBy, reviewedAt: new Date(), reviewNotes: notes }, { new: true });
        if (!submission)
            throw new common_1.NotFoundException(`Submission ${id} not found`);
        return submission;
    }
    async getComplianceMetrics(siteId, startDate, endDate) {
        const matchStage = {};
        if (siteId)
            matchStage.siteId = new mongoose_2.Types.ObjectId(siteId);
        if (startDate && endDate)
            matchStage.submittedAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        const [stats, byChecklist] = await Promise.all([
            this.submissionModel.aggregate([
                { $match: matchStage },
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            this.submissionModel.aggregate([
                { $match: matchStage },
                { $group: { _id: '$checklistId', total: { $sum: 1 }, approved: { $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] } } } },
            ]),
        ]);
        const statusCounts = stats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {});
        return {
            total: Object.values(statusCounts).reduce((a, b) => a + b, 0),
            statusBreakdown: statusCounts,
            complianceRate: byChecklist.length ? (byChecklist.reduce((a, b) => a + (b.approved / b.total), 0) / byChecklist.length * 100).toFixed(1) : 0,
        };
    }
    async getPendingReviews() {
        return this.submissionModel.find({ status: 'pending-review' }).sort({ submittedAt: 1 });
    }
};
exports.ComplianceService = ComplianceService;
exports.ComplianceService = ComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(checklist_schema_1.Checklist.name)),
    __param(1, (0, mongoose_1.InjectModel)(checklist_schema_1.ChecklistSubmission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ComplianceService);
//# sourceMappingURL=compliance.service.js.map