import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';

@Controller('guards')
export class GuardsController {
  constructor(private readonly guardsService: GuardsService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardsService.create(createGuardDto);
  }

  @Get()
  findAll(
    @Query('status') status?: 'active' | 'inactive' | 'on-leave',
    @Query('site') site?: string,
  ) {
    if (status) {
      return this.guardsService.findByStatus(status);
    }
    if (site) {
      return this.guardsService.findBySite(site);
    }
    return this.guardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardsService.findOne(id);
  }

  @Get('employee/:employeeId')
  findByEmployeeId(@Param('employeeId') employeeId: string) {
    return this.guardsService.findByEmployeeId(employeeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardsService.update(id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardsService.remove(id);
  }
}
