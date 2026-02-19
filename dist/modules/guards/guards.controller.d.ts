import { GuardsService } from './guards.service';
import { CreateGuardDto, UpdateGuardDto, GuardFilterDto } from './dto/guards.dto';
export declare class GuardsController {
    private readonly guardsService;
    constructor(guardsService: GuardsService);
    create(createGuardDto: CreateGuardDto): Promise<import("../../schemas/guard.schema").Guard>;
    findAll(filterDto: GuardFilterDto): Promise<import("../../schemas/guard.schema").Guard[]>;
    getActiveGuards(): Promise<import("../../schemas/guard.schema").Guard[]>;
    getGuardsBySite(site: string): Promise<import("../../schemas/guard.schema").Guard[]>;
    getGuardsByShift(shift: string): Promise<import("../../schemas/guard.schema").Guard[]>;
    getCount(): Promise<{
        count: number;
    }>;
    getCountByStatus(): Promise<{
        status: string;
        count: number;
    }[]>;
    findOne(id: string): Promise<import("../../schemas/guard.schema").Guard>;
    findByEmployeeId(employeeId: string): Promise<import("../../schemas/guard.schema").Guard>;
    update(id: string, updateGuardDto: UpdateGuardDto): Promise<import("../../schemas/guard.schema").Guard>;
    updateStatus(id: string, status: string): Promise<import("../../schemas/guard.schema").Guard>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
