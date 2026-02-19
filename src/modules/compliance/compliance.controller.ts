import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateChecklistDto, UpdateChecklistDto, SubmitChecklistDto, ReviewSubmissionDto } from './dto/compliance.dto';

@ApiTags('compliance')
@Controller('compliance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ComplianceController {
  constructor(private readonly service: ComplianceService) {}

  // Checklists
  @Post('checklists')
  @ApiOperation({ summary: 'Create checklist' })
  async createChecklist(@Body() dto: CreateChecklistDto) { return this.service.createChecklist(dto); }

  @Get('checklists')
  @ApiOperation({ summary: 'Get checklists' })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  async findChecklists(@Query('siteId') siteId?: string, @Query('type') type?: string, @Query('isActive') isActive?: boolean) {
    return this.service.findChecklists(siteId, type, isActive);
  }

  @Get('checklists/:id')
  @ApiOperation({ summary: 'Get checklist by ID' })
  async findChecklistById(@Param('id') id: string) { return this.service.findChecklistById(id); }

  @Put('checklists/:id')
  @ApiOperation({ summary: 'Update checklist' })
  async updateChecklist(@Param('id') id: string, @Body() dto: UpdateChecklistDto) { return this.service.updateChecklist(id, dto); }

  @Delete('checklists/:id')
  @ApiOperation({ summary: 'Delete checklist' })
  async deleteChecklist(@Param('id') id: string) { await this.service.deleteChecklist(id); return { message: 'Checklist deleted' }; }

  // Submissions
  @Post('submissions')
  @ApiOperation({ summary: 'Submit checklist' })
  async submitChecklist(@Body() dto: SubmitChecklistDto) { return this.service.submitChecklist(dto); }

  @Get('submissions')
  @ApiOperation({ summary: 'Get checklist submissions' })
  @ApiQuery({ name: 'checklistId', required: false })
  @ApiQuery({ name: 'guardId', required: false })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'status', required: false })
  async findSubmissions(@Query('checklistId') checklistId?: string, @Query('guardId') guardId?: string, @Query('siteId') siteId?: string, @Query('status') status?: string) {
    return this.service.findSubmissions(checklistId, guardId, siteId, status);
  }

  @Get('submissions/pending')
  @ApiOperation({ summary: 'Get pending submissions for review' })
  async getPendingReviews() { return this.service.getPendingReviews(); }

  @Get('submissions/:id')
  @ApiOperation({ summary: 'Get submission by ID' })
  async findSubmissionById(@Param('id') id: string) { return this.service.findSubmissionById(id); }

  @Patch('submissions/:id/review')
  @ApiOperation({ summary: 'Review checklist submission' })
  async reviewSubmission(@Param('id') id: string, @Body() dto: ReviewSubmissionDto) {
    return this.service.reviewSubmission(id, dto.status, dto.reviewedBy, dto.reviewNotes);
  }

  // Metrics
  @Get('metrics')
  @ApiOperation({ summary: 'Get compliance metrics' })
  @ApiQuery({ name: 'siteId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  async getComplianceMetrics(@Query('siteId') siteId?: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.service.getComplianceMetrics(siteId, startDate, endDate);
  }
}
