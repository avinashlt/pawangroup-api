import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report, ReportSchema, ReportConfig, ReportConfigSchema } from '../../schemas/report.schema';
import { Attendance, AttendanceSchema } from '../../schemas/attendance.schema';
import { Incident, IncidentSchema } from '../../schemas/incident.schema';
import { Guard, GuardSchema } from '../../schemas/guard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: ReportConfig.name, schema: ReportConfigSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Incident.name, schema: IncidentSchema },
      { name: Guard.name, schema: GuardSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
