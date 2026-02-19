import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SitesService } from './sites.service';
import { CreateSiteDto, UpdateSiteDto } from './dto/sites.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('sites')
@Controller('sites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new site' })
  @ApiResponse({ status: 201, description: 'Site created' })
  async create(@Body() createDto: CreateSiteDto) {
    return this.sitesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sites' })
  @ApiResponse({ status: 200, description: 'List of sites' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  async findAll(@Query('activeOnly') activeOnly?: boolean) {
    return this.sitesService.findAll(activeOnly);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search sites' })
  @ApiResponse({ status: 200, description: 'Search results' })
  @ApiQuery({ name: 'q', required: true })
  async searchSites(@Query('q') query: string) {
    return this.sitesService.searchSites(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get site by ID' })
  @ApiResponse({ status: 200, description: 'Site details' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string) {
    return this.sitesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update site' })
  @ApiResponse({ status: 200, description: 'Site updated' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateSiteDto) {
    return this.sitesService.update(id, updateDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle site active status' })
  @ApiResponse({ status: 200, description: 'Status toggled' })
  async toggleActive(@Param('id') id: string) {
    return this.sitesService.toggleActive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete site' })
  @ApiResponse({ status: 200, description: 'Site deleted' })
  async remove(@Param('id') id: string) {
    await this.sitesService.remove(id);
    return { message: 'Site deleted successfully' };
  }
}
