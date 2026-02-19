import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guard, GuardDocument } from '../../schemas/guard.schema';
import { CreateGuardDto, UpdateGuardDto, GuardFilterDto } from './dto/guards.dto';

@Injectable()
export class GuardsService {
  constructor(
    @InjectModel(Guard.name) private guardModel: Model<GuardDocument>,
  ) {}

  async create(createGuardDto: CreateGuardDto): Promise<Guard> {
    const guard = new this.guardModel(createGuardDto);
    return guard.save();
  }

  async findAll(filterDto?: GuardFilterDto): Promise<Guard[]> {
    const query: any = {};

    if (filterDto) {
      if (filterDto.status) query.status = filterDto.status;
      if (filterDto.shift) query.shift = filterDto.shift;
      if (filterDto.assignedSite) query.assignedSite = { $regex: filterDto.assignedSite, $options: 'i' };
      if (filterDto.search) {
        query.$or = [
          { name: { $regex: filterDto.search, $options: 'i' } },
          { employeeId: { $regex: filterDto.search, $options: 'i' } },
          { phone: { $regex: filterDto.search, $options: 'i' } },
        ];
      }
    }

    return this.guardModel.find(query).sort({ name: 1 });
  }

  async findOne(id: string): Promise<Guard> {
    const guard = await this.guardModel.findById(id);
    if (!guard) {
      throw new NotFoundException(`Guard with ID ${id} not found`);
    }
    return guard;
  }

  async findByEmployeeId(employeeId: string): Promise<Guard> {
    const guard = await this.guardModel.findOne({ employeeId });
    if (!guard) {
      throw new NotFoundException(`Guard with employee ID ${employeeId} not found`);
    }
    return guard;
  }

  async update(id: string, updateGuardDto: UpdateGuardDto): Promise<Guard> {
    const guard = await this.guardModel.findByIdAndUpdate(
      id,
      { $set: updateGuardDto },
      { new: true },
    );
    if (!guard) {
      throw new NotFoundException(`Guard with ID ${id} not found`);
    }
    return guard;
  }

  async remove(id: string): Promise<void> {
    const result = await this.guardModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Guard with ID ${id} not found`);
    }
  }

  async updateStatus(id: string, status: string): Promise<Guard> {
    const guard = await this.guardModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!guard) {
      throw new NotFoundException(`Guard with ID ${id} not found`);
    }
    return guard;
  }

  async getActiveGuards(): Promise<Guard[]> {
    return this.guardModel.find({ status: 'active' }).sort({ name: 1 });
  }

  async getGuardsBySite(site: string): Promise<Guard[]> {
    return this.guardModel.find({ 
      assignedSite: { $regex: site, $options: 'i' },
      status: 'active',
    }).sort({ name: 1 });
  }

  async getGuardsByShift(shift: string): Promise<Guard[]> {
    return this.guardModel.find({ 
      shift,
      status: 'active',
    }).sort({ name: 1 });
  }

  async getCount(): Promise<number> {
    return this.guardModel.countDocuments();
  }

  async getCountByStatus(): Promise<{ status: string; count: number }[]> {
    const result = await this.guardModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    return result.map(item => ({ status: item._id, count: item.count }));
  }
}
