import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guard } from './entities/guard.entity';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Injectable()
export class GuardsService {
  constructor(
    @InjectRepository(Guard)
    private readonly guardRepository: Repository<Guard>,
  ) {}

  async create(createGuardDto: CreateGuardDto): Promise<Guard> {
    const guard = this.guardRepository.create(createGuardDto);
    return await this.guardRepository.save(guard);
  }

  async findAll(): Promise<Guard[]> {
    return await this.guardRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Guard> {
    const guard = await this.guardRepository.findOne({ where: { id } });
    if (!guard) {
      throw new NotFoundException(`Guard with ID ${id} not found`);
    }
    return guard;
  }

  async findByEmployeeId(employeeId: string): Promise<Guard> {
    const guard = await this.guardRepository.findOne({ where: { employeeId } });
    if (!guard) {
      throw new NotFoundException(`Guard with Employee ID ${employeeId} not found`);
    }
    return guard;
  }

  async findByStatus(status: 'active' | 'inactive' | 'on-leave'): Promise<Guard[]> {
    return await this.guardRepository.find({
      where: { status },
      order: { name: 'ASC' },
    });
  }

  async findBySite(site: string): Promise<Guard[]> {
    return await this.guardRepository.find({
      where: { assignedSite: site },
      order: { name: 'ASC' },
    });
  }

  async update(id: string, updateGuardDto: UpdateGuardDto): Promise<Guard> {
    const guard = await this.findOne(id);
    Object.assign(guard, updateGuardDto);
    return await this.guardRepository.save(guard);
  }

  async remove(id: string): Promise<void> {
    const guard = await this.findOne(id);
    await this.guardRepository.remove(guard);
  }
}
