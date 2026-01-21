import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { Checklist } from './entities/checklist.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { ChecklistSubmission } from './entities/checklist-submission.entity';
import { Training } from './entities/training.entity';
import { GuardTraining } from './entities/guard-training.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Checklist,
      ChecklistItem,
      ChecklistSubmission,
      Training,
      GuardTraining,
    ]),
  ],
  controllers: [OperationsController],
  providers: [OperationsService],
  exports: [OperationsService],
})
export class OperationsModule {}
