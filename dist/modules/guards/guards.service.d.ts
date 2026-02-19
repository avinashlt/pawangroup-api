import { Model } from 'mongoose';
import { Guard, GuardDocument } from '../../schemas/guard.schema';
import { CreateGuardDto, UpdateGuardDto, GuardFilterDto } from './dto/guards.dto';
export declare class GuardsService {
    private guardModel;
    constructor(guardModel: Model<GuardDocument>);
    create(createGuardDto: CreateGuardDto): Promise<Guard>;
    findAll(filterDto?: GuardFilterDto): Promise<Guard[]>;
    findOne(id: string): Promise<Guard>;
    findByEmployeeId(employeeId: string): Promise<Guard>;
    update(id: string, updateGuardDto: UpdateGuardDto): Promise<Guard>;
    remove(id: string): Promise<void>;
    updateStatus(id: string, status: string): Promise<Guard>;
    getActiveGuards(): Promise<Guard[]>;
    getGuardsBySite(site: string): Promise<Guard[]>;
    getGuardsByShift(shift: string): Promise<Guard[]>;
    getCount(): Promise<number>;
    getCountByStatus(): Promise<{
        status: string;
        count: number;
    }[]>;
}
