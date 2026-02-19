import { Model } from 'mongoose';
import { Checklist, ChecklistDocument, ChecklistSubmission, ChecklistSubmissionDocument } from '../../schemas/checklist.schema';
export declare class ComplianceService {
    private checklistModel;
    private submissionModel;
    constructor(checklistModel: Model<ChecklistDocument>, submissionModel: Model<ChecklistSubmissionDocument>);
    createChecklist(data: any): Promise<Checklist>;
    findChecklists(siteId?: string, type?: string, isActive?: boolean): Promise<Checklist[]>;
    findChecklistById(id: string): Promise<Checklist>;
    updateChecklist(id: string, data: any): Promise<Checklist>;
    deleteChecklist(id: string): Promise<void>;
    submitChecklist(data: any): Promise<ChecklistSubmission>;
    findSubmissions(checklistId?: string, guardId?: string, siteId?: string, status?: string): Promise<ChecklistSubmission[]>;
    findSubmissionById(id: string): Promise<ChecklistSubmission>;
    reviewSubmission(id: string, status: string, reviewedBy: string, notes?: string): Promise<ChecklistSubmission>;
    getComplianceMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any>;
    getPendingReviews(): Promise<ChecklistSubmission[]>;
}
