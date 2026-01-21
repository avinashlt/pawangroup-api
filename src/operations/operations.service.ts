import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checklist } from './entities/checklist.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { ChecklistSubmission } from './entities/checklist-submission.entity';
import { Training } from './entities/training.entity';
import { GuardTraining } from './entities/guard-training.entity';
import { CreateChecklistDto, CreateTrainingDto } from './dto/create-operations.dto';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Checklist)
    private readonly checklistRepository: Repository<Checklist>,
    @InjectRepository(ChecklistItem)
    private readonly checklistItemRepository: Repository<ChecklistItem>,
    @InjectRepository(ChecklistSubmission)
    private readonly submissionRepository: Repository<ChecklistSubmission>,
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @InjectRepository(GuardTraining)
    private readonly guardTrainingRepository: Repository<GuardTraining>,
  ) {}

  // Checklists
  async createChecklist(dto: CreateChecklistDto): Promise<Checklist> {
    const checklist = this.checklistRepository.create({
      name: dto.name,
      siteId: dto.siteId,
      siteName: dto.siteName,
      type: dto.type,
    });
    const savedChecklist = await this.checklistRepository.save(checklist);

    if (dto.items && dto.items.length > 0) {
      const items = dto.items.map((item) =>
        this.checklistItemRepository.create({
          checklistId: savedChecklist.id,
          description: item.description,
          isRequired: item.isRequired,
          order: item.order,
        }),
      );
      await this.checklistItemRepository.save(items);
    }

    const checklistWithItems = await this.checklistRepository.findOne({
      where: { id: savedChecklist.id },
      relations: ['items'],
    });
    
    if (!checklistWithItems) {
      throw new Error(`Checklist with ID ${savedChecklist.id} not found`);
    }
    
    return checklistWithItems;
  }

  async findAllChecklists(): Promise<Checklist[]> {
    return await this.checklistRepository.find({
      relations: ['items'],
      order: { name: 'ASC' },
    });
  }

  async findChecklist(id: string): Promise<Checklist> {
    const checklist = await this.checklistRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!checklist) {
      throw new NotFoundException(`Checklist with ID ${id} not found`);
    }
    return checklist;
  }

  async findChecklistsBySite(siteId: string): Promise<Checklist[]> {
    return await this.checklistRepository.find({
      where: { siteId },
      relations: ['items'],
    });
  }

  // Trainings
  async createTraining(dto: CreateTrainingDto): Promise<Training> {
    const training = this.trainingRepository.create(dto);
    return await this.trainingRepository.save(training);
  }

  async findAllTrainings(): Promise<Training[]> {
    return await this.trainingRepository.find({ order: { name: 'ASC' } });
  }

  async findTraining(id: string): Promise<Training> {
    const training = await this.trainingRepository.findOne({ where: { id } });
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return training;
  }

  async assignTrainingToGuard(
    guardId: string,
    guardName: string,
    trainingId: string,
    dueDate: Date,
  ): Promise<GuardTraining> {
    const training = await this.findTraining(trainingId);
    
    const guardTraining = this.guardTrainingRepository.create({
      guardId,
      guardName,
      trainingId,
      trainingName: training.name,
      status: 'not-started',
      assignedAt: new Date(),
      dueDate,
    });
    
    return await this.guardTrainingRepository.save(guardTraining);
  }

  async findGuardTrainings(guardId: string): Promise<GuardTraining[]> {
    return await this.guardTrainingRepository.find({
      where: { guardId },
      order: { assignedAt: 'DESC' },
    });
  }
}
