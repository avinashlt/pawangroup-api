import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { UpdateLocationDto } from './dto/locations.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('locations')
@Controller('locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update guard location' })
  @ApiResponse({ status: 200, description: 'Location updated' })
  async updateLocation(@Body() updateDto: UpdateLocationDto) {
    return this.locationsService.updateLocation(
      updateDto.guardId,
      updateDto.guardName,
      updateDto.latitude,
      updateDto.longitude,
      updateDto.address,
      updateDto.accuracy,
      updateDto.batteryLevel,
    );
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active guard locations' })
  @ApiResponse({ status: 200, description: 'List of active locations' })
  async getActiveLocations() {
    return this.locationsService.getActiveLocations();
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all guard locations' })
  @ApiResponse({ status: 200, description: 'List of all locations' })
  async getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Get guards near a location' })
  @ApiResponse({ status: 200, description: 'Nearby guards' })
  @ApiQuery({ name: 'latitude', required: true, type: Number })
  @ApiQuery({ name: 'longitude', required: true, type: Number })
  @ApiQuery({ name: 'radius', required: false, type: Number, description: 'Radius in km (default: 1)' })
  async getLocationsNearby(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius?: number,
  ) {
    return this.locationsService.getLocationsNearby(latitude, longitude, radius || 1);
  }

  @Get('guard/:guardId')
  @ApiOperation({ summary: 'Get guard current location' })
  @ApiResponse({ status: 200, description: 'Guard location' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getGuardLocation(@Param('guardId') guardId: string) {
    return this.locationsService.getGuardLocation(guardId);
  }

  @Get('history/:guardId')
  @ApiOperation({ summary: 'Get guard location history' })
  @ApiResponse({ status: 200, description: 'Location history' })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getLocationHistory(
    @Param('guardId') guardId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.locationsService.getLocationHistory(
      guardId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Patch(':guardId/inactive')
  @ApiOperation({ summary: 'Set guard location as inactive' })
  @ApiResponse({ status: 200, description: 'Location set to inactive' })
  async setInactive(@Param('guardId') guardId: string) {
    return this.locationsService.setInactive(guardId);
  }
}
