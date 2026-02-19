import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from '../../schemas/site.schema';
import { CreateSiteDto, UpdateSiteDto } from './dto/sites.dto';

@Injectable()
export class SitesService {
  constructor(
    @InjectModel(Site.name) private siteModel: Model<SiteDocument>,
  ) {}

  async create(createDto: CreateSiteDto): Promise<Site> {
    const site = new this.siteModel(createDto);
    return site.save();
  }

  async findAll(activeOnly: boolean = false): Promise<Site[]> {
    const query = activeOnly ? { isActive: true } : {};
    return this.siteModel.find(query).sort({ name: 1 });
  }

  async findOne(id: string): Promise<Site> {
    const site = await this.siteModel.findById(id);
    if (!site) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    return site;
  }

  async update(id: string, updateDto: UpdateSiteDto): Promise<Site> {
    const site = await this.siteModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true },
    );
    if (!site) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    return site;
  }

  async remove(id: string): Promise<void> {
    const result = await this.siteModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
  }

  async toggleActive(id: string): Promise<Site> {
    const site = await this.siteModel.findById(id);
    if (!site) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    site.isActive = !site.isActive;
    return site.save();
  }

  async searchSites(query: string): Promise<Site[]> {
    return this.siteModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { clientName: { $regex: query, $options: 'i' } },
      ],
    }).sort({ name: 1 });
  }
}
