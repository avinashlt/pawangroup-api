import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { SOSAlert } from './entities/sos-alert.entity';
import { SleepAlert } from './entities/sleep-alert.entity';
import { AIAlert } from './entities/ai-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SOSAlert, SleepAlert, AIAlert])],
  controllers: [AlertsController],
  providers: [AlertsService],
  exports: [AlertsService],
})
export class AlertsModule {}
