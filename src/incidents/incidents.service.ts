import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentLog } from './entities/incident-log.entity';
import { CreateIncidentLogDto } from './dto/create-incident-log.dto';
import { UpdateIncidentLogDto } from './dto/update-incident-log.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(IncidentLog)
    private readonly incidentLogRepository: Repository<IncidentLog>,
  ) {}

  async create(createIncidentLogDto: CreateIncidentLogDto): Promise<IncidentLog> {
    const incident = this.incidentLogRepository.create({
      ...createIncidentLogDto,
      timestamp: new Date(),
      status: 'new',
    });
    return await this.incidentLogRepository.save(incident);
  }

  async findAll(): Promise<IncidentLog[]> {
    return await this.incidentLogRepository.find({
      relations: ['media'],
      order: { timestamp: 'DESC' },
    });
  }

  async findOne(id: string): Promise<IncidentLog> {
    const incident = await this.incidentLogRepository.findOne({
      where: { id },
      relations: ['media'],
    });
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async findByGuard(guardId: string): Promise<IncidentLog[]> {
    return await this.incidentLogRepository.find({
      where: { guardId },
      relations: ['media'],
      order: { timestamp: 'DESC' },
    });
  }

  async findBySeverity(severity: 'low' | 'medium' | 'high' | 'critical'): Promise<IncidentLog[]> {
    return await this.incidentLogRepository.find({
      where: { severity },
      relations: ['media'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByStatus(status: 'new' | 'reviewing' | 'resolved' | 'escalated'): Promise<IncidentLog[]> {
    return await this.incidentLogRepository.find({
      where: { status },
      relations: ['media'],
      order: { timestamp: 'DESC' },
    });
  }

  async findBySite(site: string): Promise<IncidentLog[]> {
    return await this.incidentLogRepository.find({
      where: { site },
      relations: ['media'],
      order: { timestamp: 'DESC' },
    });
  }

  async update(id: string, updateIncidentLogDto: UpdateIncidentLogDto): Promise<IncidentLog> {
    const incident = await this.findOne(id);
    
    if (updateIncidentLogDto.status === 'resolved' && !incident.resolvedAt) {
      incident.resolvedAt = new Date();
    }
    
    Object.assign(incident, updateIncidentLogDto);
    return await this.incidentLogRepository.save(incident);
  }

  async remove(id: string): Promise<void> {
    const incident = await this.findOne(id);
    await this.incidentLogRepository.remove(incident);
  }
}
