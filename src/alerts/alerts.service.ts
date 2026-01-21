import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SOSAlert } from './entities/sos-alert.entity';
import { SleepAlert } from './entities/sleep-alert.entity';
import { AIAlert } from './entities/ai-alert.entity';
import { CreateSOSAlertDto, CreateSleepAlertDto, CreateAIAlertDto } from './dto/create-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(SOSAlert)
    private readonly sosRepository: Repository<SOSAlert>,
    @InjectRepository(SleepAlert)
    private readonly sleepRepository: Repository<SleepAlert>,
    @InjectRepository(AIAlert)
    private readonly aiRepository: Repository<AIAlert>,
  ) {}

  // SOS Alerts
  async createSOSAlert(dto: CreateSOSAlertDto): Promise<SOSAlert> {
    const alert = this.sosRepository.create({
      ...dto,
      timestamp: new Date(),
      status: 'active',
      priority: 'critical',
    });
    return await this.sosRepository.save(alert);
  }

  async findAllSOSAlerts(): Promise<SOSAlert[]> {
    return await this.sosRepository.find({ order: { timestamp: 'DESC' } });
  }

  async findActiveSOSAlerts(): Promise<SOSAlert[]> {
    return await this.sosRepository.find({
      where: { status: 'active' },
      order: { timestamp: 'DESC' },
    });
  }

  async updateSOSAlertStatus(
    id: string,
    status: 'active' | 'responding' | 'resolved' | 'false-alarm',
    respondedBy?: string,
  ): Promise<SOSAlert> {
    const alert = await this.sosRepository.findOne({ where: { id } });
    if (!alert) {
      throw new NotFoundException(`SOS Alert with ID ${id} not found`);
    }
    alert.status = status;
    if (respondedBy) {
      alert.respondedBy = respondedBy;
      alert.respondedAt = new Date();
    }
    if (status === 'resolved') {
      alert.resolvedAt = new Date();
    }
    return await this.sosRepository.save(alert);
  }

  // Sleep Alerts
  async createSleepAlert(dto: CreateSleepAlertDto): Promise<SleepAlert> {
    const alert = this.sleepRepository.create({
      ...dto,
      detectedAt: new Date(),
      status: 'active',
    });
    return await this.sleepRepository.save(alert);
  }

  async findAllSleepAlerts(): Promise<SleepAlert[]> {
    return await this.sleepRepository.find({ order: { detectedAt: 'DESC' } });
  }

  // AI Alerts
  async createAIAlert(dto: CreateAIAlertDto): Promise<AIAlert> {
    const alert = this.aiRepository.create({
      ...dto,
      detectedAt: new Date(),
      status: 'new',
    });
    return await this.aiRepository.save(alert);
  }

  async findAllAIAlerts(): Promise<AIAlert[]> {
    return await this.aiRepository.find({ order: { detectedAt: 'DESC' } });
  }

  async findAIAlertsBySite(siteId: string): Promise<AIAlert[]> {
    return await this.aiRepository.find({
      where: { siteId },
      order: { detectedAt: 'DESC' },
    });
  }
}
