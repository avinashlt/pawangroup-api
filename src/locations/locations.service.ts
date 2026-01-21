import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create({
      ...createLocationDto,
      timestamp: new Date(),
    });
    return await this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find({
      order: { timestamp: 'DESC' },
      take: 1000,
    });
  }

  async findByGuard(guardId: string, limit: number = 100): Promise<Location[]> {
    return await this.locationRepository.find({
      where: { guardId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async findLatestByGuard(guardId: string): Promise<Location | null> {
    return await this.locationRepository.findOne({
      where: { guardId, isActive: true },
      order: { timestamp: 'DESC' },
    });
  }

  async findActiveLocations(): Promise<Location[]> {
    return await this.locationRepository.find({
      where: { isActive: true },
      order: { timestamp: 'DESC' },
    });
  }
}
