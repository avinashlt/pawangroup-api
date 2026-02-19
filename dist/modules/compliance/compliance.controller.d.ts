import { ComplianceService } from './compliance.service';
import { CreateChecklistDto, UpdateChecklistDto, SubmitChecklistDto, ReviewSubmissionDto } from './dto/compliance.dto';
export declare class ComplianceController {
    private readonly service;
    constructor(service: ComplianceService);
    createChecklist(dto: CreateChecklistDto): Promise<import("../../schemas/checklist.schema").Checklist>;
    findChecklists(siteId?: string, type?: string, isActive?: boolean): Promise<import("../../schemas/checklist.schema").Checklist[]>;
    findChecklistById(id: string): Promise<import("../../schemas/checklist.schema").Checklist>;
    updateChecklist(id: string, dto: UpdateChecklistDto): Promise<import("../../schemas/checklist.schema").Checklist>;
    deleteChecklist(id: string): Promise<{
        message: string;
    }>;
    submitChecklist(dto: SubmitChecklistDto): Promise<import("../../schemas/checklist.schema").ChecklistSubmission>;
    findSubmissions(checklistId?: string, guardId?: string, siteId?: string, status?: string): Promise<import("../../schemas/checklist.schema").ChecklistSubmission[]>;
    getPendingReviews(): Promise<import("../../schemas/checklist.schema").ChecklistSubmission[]>;
    findSubmissionById(id: string): Promise<import("../../schemas/checklist.schema").ChecklistSubmission>;
    reviewSubmission(id: string, dto: ReviewSubmissionDto): Promise<import("../../schemas/checklist.schema").ChecklistSubmission>;
    getComplianceMetrics(siteId?: string, startDate?: string, endDate?: string): Promise<any>;
}
