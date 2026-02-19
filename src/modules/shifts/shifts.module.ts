import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { Shift, ShiftSchema, ShiftTemplate, ShiftTemplateSchema, ShiftSwapRequest, ShiftSwapRequestSchema, TimeOffRequest, TimeOffRequestSchema } from '../../schemas/shift.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shift.name, schema: ShiftSchema },
      { name: ShiftTemplate.name, schema: ShiftTemplateSchema },
      { name: ShiftSwapRequest.name, schema: ShiftSwapRequestSchema },
      { name: TimeOffRequest.name, schema: TimeOffRequestSchema },
    ]),
  ],
  controllers: [ShiftsController],
  providers: [ShiftsService],
  exports: [ShiftsService],
})
export class ShiftsModule {}
