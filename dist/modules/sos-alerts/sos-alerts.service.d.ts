import { Model } from 'mongoose';
import { SosAlert, SosAlertDocument } from '../../schemas/sos-alert.schema';
export declare class SosAlertsService {
    private sosAlertModel;
    constructor(sosAlertModel: Model<SosAlertDocument>);
    create(data: any): Promise<SosAlert>;
    findAll(status?: string, siteId?: string): Promise<SosAlert[]>;
    findById(id: string): Promise<SosAlert>;
    respond(id: string, respondedBy: string): Promise<SosAlert>;
    resolve(id: string, resolvedBy: string, resolutionNotes?: string): Promise<SosAlert>;
    getActiveAlerts(): Promise<SosAlert[]>;
    getStats(): Promise<{
        total: number;
        active: number;
        responding: number;
        resolved: number;
        avgResponseTime: number;
    }>;
}
