import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { CheckpointScan } from './entities/checkpoint-scan.entity';
import { CreateCheckpointDto, CreateCheckpointScanDto } from './dto/create-checkpoint.dto';

@Injectable()
export class CheckpointsService {
  constructor(
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    @InjectRepository(CheckpointScan)
    private readonly scanRepository: Repository<CheckpointScan>,
  ) {}

  // Checkpoint CRUD
  async createCheckpoint(dto: CreateCheckpointDto): Promise<Checkpoint> {
    const checkpoint = this.checkpointRepository.create(dto);
    return await this.checkpointRepository.save(checkpoint);
  }

  async findAllCheckpoints(): Promise<Checkpoint[]> {
    return await this.checkpointRepository.find({ order: { name: 'ASC' } });
  }

  async findCheckpoint(id: string): Promise<Checkpoint> {
    const checkpoint = await this.checkpointRepository.findOne({ where: { id } });
    if (!checkpoint) {
      throw new NotFoundException(`Checkpoint with ID ${id} not found`);
    }
    return checkpoint;
  }

  async findCheckpointsBySite(siteId: string): Promise<Checkpoint[]> {
    return await this.checkpointRepository.find({ where: { siteId } });
  }

  // Checkpoint Scan CRUD
  async createScan(dto: CreateCheckpointScanDto): Promise<CheckpointScan> {
    const scan = this.scanRepository.create({
      ...dto,
      scannedAt: new Date(),
      status: dto.status || 'on-time',
    });
    
    // Update checkpoint last scanned time
    await this.checkpointRepository.update(dto.checkpointId, {
      lastScanned: new Date(),
    });
    
    return await this.scanRepository.save(scan);
  }

  async findAllScans(): Promise<CheckpointScan[]> {
    return await this.scanRepository.find({ order: { scannedAt: 'DESC' } });
  }

  async findScansByCheckpoint(checkpointId: string): Promise<CheckpointScan[]> {
    return await this.scanRepository.find({
      where: { checkpointId },
      order: { scannedAt: 'DESC' },
    });
  }

  async findScansByGuard(guardId: string): Promise<CheckpointScan[]> {
    return await this.scanRepository.find({
      where: { guardId },
      order: { scannedAt: 'DESC' },
    });
  }
}
