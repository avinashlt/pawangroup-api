import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftTemplate } from './entities/shift-template.entity';
import { ScheduledShift } from './entities/scheduled-shift.entity';
import { CreateShiftTemplateDto, CreateScheduledShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(ShiftTemplate)
    private readonly templateRepository: Repository<ShiftTemplate>,
    @InjectRepository(ScheduledShift)
    private readonly scheduledShiftRepository: Repository<ScheduledShift>,
  ) {}

  // Shift Templates
  async createTemplate(dto: CreateShiftTemplateDto): Promise<ShiftTemplate> {
    const template = this.templateRepository.create(dto);
    return await this.templateRepository.save(template);
  }

  async findAllTemplates(): Promise<ShiftTemplate[]> {
    return await this.templateRepository.find({ order: { name: 'ASC' } });
  }

  async findTemplate(id: string): Promise<ShiftTemplate> {
    const template = await this.templateRepository.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Shift template with ID ${id} not found`);
    }
    return template;
  }

  // Scheduled Shifts
  async createScheduledShift(dto: CreateScheduledShiftDto): Promise<ScheduledShift> {
    const shift = this.scheduledShiftRepository.create({
      ...dto,
      status: dto.status || 'scheduled',
    });
    return await this.scheduledShiftRepository.save(shift);
  }

  async findAllShifts(): Promise<ScheduledShift[]> {
    return await this.scheduledShiftRepository.find({
      order: { date: 'DESC', startTime: 'ASC' },
    });
  }

  async findShift(id: string): Promise<ScheduledShift> {
    const shift = await this.scheduledShiftRepository.findOne({ where: { id } });
    if (!shift) {
      throw new NotFoundException(`Scheduled shift with ID ${id} not found`);
    }
    return shift;
  }

  async findShiftsByGuard(guardId: string): Promise<ScheduledShift[]> {
    return await this.scheduledShiftRepository.find({
      where: { guardId },
      order: { date: 'DESC' },
    });
  }

  async findShiftsByDate(date: Date): Promise<ScheduledShift[]> {
    return await this.scheduledShiftRepository.find({
      where: { date },
      order: { startTime: 'ASC' },
    });
  }

  async findShiftsBySite(siteId: string): Promise<ScheduledShift[]> {
    return await this.scheduledShiftRepository.find({
      where: { siteId },
      order: { date: 'DESC' },
    });
  }

  async updateShiftStatus(
    id: string,
    status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled',
  ): Promise<ScheduledShift> {
    const shift = await this.findShift(id);
    shift.status = status;
    return await this.scheduledShiftRepository.save(shift);
  }
}
