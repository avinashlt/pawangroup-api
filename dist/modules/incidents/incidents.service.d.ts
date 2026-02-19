import { Model } from 'mongoose';
import { Incident, IncidentDocument } from '../../schemas/incident.schema';
import { CreateIncidentDto, UpdateIncidentDto, IncidentFilterDto } from './dto/incidents.dto';
export declare class IncidentsService {
    private incidentModel;
    constructor(incidentModel: Model<IncidentDocument>);
    create(createDto: CreateIncidentDto): Promise<Incident>;
    findAll(filterDto?: IncidentFilterDto): Promise<Incident[]>;
    findOne(id: string): Promise<Incident>;
    update(id: string, updateDto: UpdateIncidentDto): Promise<Incident>;
    updateStatus(id: string, status: string, resolvedBy?: string, notes?: string): Promise<Incident>;
    addMedia(id: string, media: any): Promise<Incident>;
    remove(id: string): Promise<void>;
    getActiveIncidents(): Promise<Incident[]>;
    getRecentIncidents(limit?: number): Promise<Incident[]>;
    getIncidentsBySeverity(severity: string): Promise<Incident[]>;
    getIncidentsByGuard(guardId: string): Promise<Incident[]>;
    getStatistics(): Promise<{
        total: number;
        byStatus: Record<string, number>;
        bySeverity: Record<string, number>;
    }>;
    getStats(): Promise<{
        total: number;
        byStatus: Record<string, number>;
        bySeverity: Record<string, number>;
    }>;
}
