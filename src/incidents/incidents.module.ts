import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { IncidentLog } from './entities/incident-log.entity';
import { IncidentMedia } from './entities/incident-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentLog, IncidentMedia])],
  controllers: [IncidentsController],
  providers: [IncidentsService],
  exports: [IncidentsService],
})
export class IncidentsModule {}
