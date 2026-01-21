import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { ShiftTemplate } from './entities/shift-template.entity';
import { ScheduledShift } from './entities/scheduled-shift.entity';
import { ShiftSwapRequest } from './entities/shift-swap-request.entity';
import { TimeOffRequest } from './entities/time-off-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftTemplate, ScheduledShift, ShiftSwapRequest, TimeOffRequest])],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [ShiftsService],
})
export class ShiftsModule {}
