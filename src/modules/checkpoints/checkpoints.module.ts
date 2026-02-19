import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckpointsController } from './checkpoints.controller';
import { CheckpointsService } from './checkpoints.service';
import { Checkpoint, CheckpointSchema, CheckpointScan, CheckpointScanSchema } from '../../schemas/checkpoint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkpoint.name, schema: CheckpointSchema },
      { name: CheckpointScan.name, schema: CheckpointScanSchema },
    ]),
  ],
  controllers: [CheckpointsController],
  providers: [CheckpointsService],
  exports: [CheckpointsService],
})
export class CheckpointsModule {}
