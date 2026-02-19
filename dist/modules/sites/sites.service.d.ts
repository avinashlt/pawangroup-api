import { Model } from 'mongoose';
import { Site, SiteDocument } from '../../schemas/site.schema';
import { CreateSiteDto, UpdateSiteDto } from './dto/sites.dto';
export declare class SitesService {
    private siteModel;
    constructor(siteModel: Model<SiteDocument>);
    create(createDto: CreateSiteDto): Promise<Site>;
    findAll(activeOnly?: boolean): Promise<Site[]>;
    findOne(id: string): Promise<Site>;
    update(id: string, updateDto: UpdateSiteDto): Promise<Site>;
    remove(id: string): Promise<void>;
    toggleActive(id: string): Promise<Site>;
    searchSites(query: string): Promise<Site[]>;
}
