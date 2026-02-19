import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Checklist, ChecklistDocument, ChecklistSubmission, ChecklistSubmissionDocument } from '../../schemas/checklist.schema';

@Injectable()
export class ComplianceService {
  constructor(
    @InjectModel(Checklist.name) private checklistModel: Model<ChecklistDocument>,
    @InjectModel(ChecklistSubmission.name) private submissionModel: Model<ChecklistSubmissionDocument>,
  ) {}

  // Checklists
  async createChecklist(data: any): Promise<Checklist> {
    const checklist = new this.checklistModel(data);
    return checklist.save();
  }

  async findChecklists(siteId?: string, type?: string, isActive?: boolean): Promise<Checklist[]> {
    const query: any = {};
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive;
    return this.checklistModel.find(query).sort({ name: 1 });
  }

  async findChecklistById(id: string): Promise<Checklist> {
    const checklist = await this.checklistModel.findById(id);
    if (!checklist) throw new NotFoundException(`Checklist ${id} not found`);
    return checklist;
  }

  async updateChecklist(id: string, data: any): Promise<Checklist> {
    const checklist = await this.checklistModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    if (!checklist) throw new NotFoundException(`Checklist ${id} not found`);
    return checklist;
  }

  async deleteChecklist(id: string): Promise<void> {
    const result = await this.checklistModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Checklist ${id} not found`);
  }

  // Submissions
  async submitChecklist(data: any): Promise<ChecklistSubmission> {
    const submission = new this.submissionModel({
      ...data,
      checklistId: new Types.ObjectId(data.checklistId as any),
      guardId: new Types.ObjectId(data.guardId as any),
      siteId: new Types.ObjectId(data.siteId as any),
      submittedAt: new Date(),
      status: 'pending-review',
    });
    return submission.save();
  }

  async findSubmissions(checklistId?: string, guardId?: string, siteId?: string, status?: string): Promise<ChecklistSubmission[]> {
    const query: any = {};
    if (checklistId) query.checklistId = new Types.ObjectId(checklistId);
    if (guardId) query.guardId = new Types.ObjectId(guardId);
    if (siteId) query.siteId = new Types.ObjectId(siteId);
    if (status) query.status = status;
    return this.submissionModel.find(query).sort({ submittedAt: -1 });
  }

  async findSubmissionById(id: string): Promise<ChecklistSubmission> {
    const submission = await this.submissionModel.findById(id);
    if (!submission) throw new NotFoundException(`Submission ${id} not found`);
    return submission;
  }

  async reviewSubmission(id: string, status: string, reviewedBy: string, notes?: string): Promise<ChecklistSubmission> {
    const submission = await this.submissionModel.findByIdAndUpdate(
      id,
      { status, reviewedBy, reviewedAt: new Date(), reviewNotes: notes },
      { new: true },
    );
    if (!submission) throw new NotFoundException(`Submission ${id} not found`);
    return submission;
  }

  // Compliance metrics
  async getComplianceMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any> {
    const matchStage: any = {};
    if (siteId) matchStage.siteId = new Types.ObjectId(siteId);
    if (startDate && endDate) matchStage.submittedAt = { $gte: new Date(startDate), $lte: new Date(endDate) };

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
      total: Object.values(statusCounts).reduce((a: any, b: any) => a + b, 0),
      statusBreakdown: statusCounts,
      complianceRate: byChecklist.length ? (byChecklist.reduce((a, b) => a + (b.approved / b.total), 0) / byChecklist.length * 100).toFixed(1) : 0,
    };
  }

  async getPendingReviews(): Promise<ChecklistSubmission[]> {
    return this.submissionModel.find({ status: 'pending-review' }).sort({ submittedAt: 1 });
  }
}
