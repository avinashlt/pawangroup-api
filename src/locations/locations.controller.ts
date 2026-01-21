import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  findAll(@Query('active') active?: string) {
    if (active === 'true') {
      return this.locationsService.findActiveLocations();
    }
    return this.locationsService.findAll();
  }

  @Get('guard/:guardId')
  findByGuard(@Param('guardId') guardId: string, @Query('limit') limit?: string) {
    return this.locationsService.findByGuard(guardId, limit ? parseInt(limit) : 100);
  }

  @Get('guard/:guardId/latest')
  findLatestByGuard(@Param('guardId') guardId: string) {
    return this.locationsService.findLatestByGuard(guardId);
  }
}
