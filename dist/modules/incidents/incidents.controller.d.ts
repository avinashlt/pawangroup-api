import { IncidentsService } from './incidents.service';
import { CreateIncidentDto, UpdateIncidentDto, IncidentFilterDto, UpdateStatusDto, AddMediaDto } from './dto/incidents.dto';
export declare class IncidentsController {
    private readonly incidentsService;
    constructor(incidentsService: IncidentsService);
    create(createDto: CreateIncidentDto): Promise<import("../../schemas/incident.schema").Incident>;
    findAll(filterDto: IncidentFilterDto): Promise<import("../../schemas/incident.schema").Incident[]>;
    getActiveIncidents(): Promise<import("../../schemas/incident.schema").Incident[]>;
    getRecentIncidents(limit?: number): Promise<import("../../schemas/incident.schema").Incident[]>;
    getStats(): Promise<{
        total: number;
        byStatus: Record<string, number>;
        bySeverity: Record<string, number>;
    }>;
    getIncidentsBySeverity(severity: string): Promise<import("../../schemas/incident.schema").Incident[]>;
    getIncidentsByGuard(guardId: string): Promise<import("../../schemas/incident.schema").Incident[]>;
    findOne(id: string): Promise<import("../../schemas/incident.schema").Incident>;
    update(id: string, updateDto: UpdateIncidentDto): Promise<import("../../schemas/incident.schema").Incident>;
    updateStatus(id: string, statusDto: UpdateStatusDto): Promise<import("../../schemas/incident.schema").Incident>;
    addMedia(id: string, mediaDto: AddMediaDto): Promise<import("../../schemas/incident.schema").Incident>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
