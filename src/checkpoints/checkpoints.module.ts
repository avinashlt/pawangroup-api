import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckpointsService } from './checkpoints.service';
import { CheckpointsController } from './checkpoints.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { CheckpointScan } from './entities/checkpoint-scan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkpoint, CheckpointScan])],
  controllers: [CheckpointsController],
  providers: [CheckpointsService],
  exports: [CheckpointsService],
})
export class CheckpointsModule {}
