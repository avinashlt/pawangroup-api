import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GuardsService } from './guards.service';
import { CreateGuardDto, UpdateGuardDto, GuardFilterDto, GuardResponseDto } from './dto/guards.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('guards')
@Controller('guards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new guard' })
  @ApiResponse({ status: 201, description: 'Guard created successfully', type: GuardResponseDto })
  async create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all guards with optional filtering' })
  @ApiResponse({ status: 200, description: 'List of guards', type: [GuardResponseDto] })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive', 'on-leave'] })
  @ApiQuery({ name: 'shift', required: false, enum: ['morning', 'evening', 'night'] })
  @ApiQuery({ name: 'assignedSite', required: false })
  @ApiQuery({ name: 'search', required: false })
  async findAll(@Query() filterDto: GuardFilterDto) {
    return this.guardsService.findAll(filterDto);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active guards' })
  @ApiResponse({ status: 200, description: 'List of active guards', type: [GuardResponseDto] })
  async getActiveGuards() {
    return this.guardsService.getActiveGuards();
  }

  @Get('by-site/:site')
  @ApiOperation({ summary: 'Get guards by site' })
  @ApiResponse({ status: 200, description: 'List of guards at site', type: [GuardResponseDto] })
  async getGuardsBySite(@Param('site') site: string) {
    return this.guardsService.getGuardsBySite(site);
  }

  @Get('by-shift/:shift')
  @ApiOperation({ summary: 'Get guards by shift' })
  @ApiResponse({ status: 200, description: 'List of guards on shift', type: [GuardResponseDto] })
  async getGuardsByShift(@Param('shift') shift: string) {
    return this.guardsService.getGuardsByShift(shift);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get total guard count' })
  @ApiResponse({ status: 200, description: 'Total count of guards' })
  async getCount() {
    const count = await this.guardsService.getCount();
    return { count };
  }

  @Get('count-by-status')
  @ApiOperation({ summary: 'Get guard count by status' })
  @ApiResponse({ status: 200, description: 'Guard count grouped by status' })
  async getCountByStatus() {
    return this.guardsService.getCountByStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get guard by ID' })
  @ApiResponse({ status: 200, description: 'Guard details', type: GuardResponseDto })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async findOne(@Param('id') id: string) {
    return this.guardsService.findOne(id);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Get guard by employee ID' })
  @ApiResponse({ status: 200, description: 'Guard details', type: GuardResponseDto })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.guardsService.findByEmployeeId(employeeId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update guard' })
  @ApiResponse({ status: 200, description: 'Guard updated successfully', type: GuardResponseDto })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardsService.update(id, updateGuardDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update guard status' })
  @ApiResponse({ status: 200, description: 'Guard status updated', type: GuardResponseDto })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.guardsService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete guard' })
  @ApiResponse({ status: 200, description: 'Guard deleted successfully' })
  @ApiResponse({ status: 404, description: 'Guard not found' })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.guardsService.remove(id);
    return { message: 'Guard deleted successfully' };
  }
}
