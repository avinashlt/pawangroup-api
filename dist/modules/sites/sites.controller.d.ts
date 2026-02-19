import { SitesService } from './sites.service';
import { CreateSiteDto, UpdateSiteDto } from './dto/sites.dto';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    create(createDto: CreateSiteDto): Promise<import("../../schemas/site.schema").Site>;
    findAll(activeOnly?: boolean): Promise<import("../../schemas/site.schema").Site[]>;
    searchSites(query: string): Promise<import("../../schemas/site.schema").Site[]>;
    findOne(id: string): Promise<import("../../schemas/site.schema").Site>;
    update(id: string, updateDto: UpdateSiteDto): Promise<import("../../schemas/site.schema").Site>;
    toggleActive(id: string): Promise<import("../../schemas/site.schema").Site>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
