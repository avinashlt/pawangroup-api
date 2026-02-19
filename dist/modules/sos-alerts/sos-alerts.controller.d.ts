import { SosAlertsService } from './sos-alerts.service';
import { CreateSosAlertDto, RespondDto, ResolveDto } from './dto/sos-alerts.dto';
export declare class SosAlertsController {
    private readonly service;
    constructor(service: SosAlertsService);
    create(dto: CreateSosAlertDto): Promise<import("../../schemas/sos-alert.schema").SosAlert>;
    findAll(status?: string, siteId?: string): Promise<import("../../schemas/sos-alert.schema").SosAlert[]>;
    getActive(): Promise<import("../../schemas/sos-alert.schema").SosAlert[]>;
    getStats(): Promise<{
        total: number;
        active: number;
        responding: number;
        resolved: number;
        avgResponseTime: number;
    }>;
    findById(id: string): Promise<import("../../schemas/sos-alert.schema").SosAlert>;
    respond(id: string, dto: RespondDto): Promise<import("../../schemas/sos-alert.schema").SosAlert>;
    resolve(id: string, dto: ResolveDto): Promise<import("../../schemas/sos-alert.schema").SosAlert>;
}
