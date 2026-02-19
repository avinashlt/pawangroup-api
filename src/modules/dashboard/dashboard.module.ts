import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Guard, GuardSchema } from '../../schemas/guard.schema';
import { Attendance, AttendanceSchema } from '../../schemas/attendance.schema';
import { Incident, IncidentSchema } from '../../schemas/incident.schema';
import { SosAlert, SosAlertSchema } from '../../schemas/sos-alert.schema';
import { SleepAlert, SleepAlertSchema, AiAlert, AiAlertSchema } from '../../schemas/monitoring.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Guard.name, schema: GuardSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Incident.name, schema: IncidentSchema },
      { name: SosAlert.name, schema: SosAlertSchema },
      { name: SleepAlert.name, schema: SleepAlertSchema },
      { name: AiAlert.name, schema: AiAlertSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
