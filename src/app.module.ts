import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Feature Modules
import { AuthModule } from './modules/auth/auth.module';
import { GuardsModule } from './modules/guards/guards.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { LocationsModule } from './modules/locations/locations.module';
import { CheckpointsModule } from './modules/checkpoints/checkpoints.module';
import { GeofencesModule } from './modules/geofences/geofences.module';
import { SosAlertsModule } from './modules/sos-alerts/sos-alerts.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SitesModule } from './modules/sites/sites.module';
import { ShiftsModule } from './modules/shifts/shifts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { TrainingModule } from './modules/training/training.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { CamerasModule } from './modules/cameras/cameras.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/pawangroup_portal',
      {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      },
    ),

    // Feature Modules
    AuthModule,
    DashboardModule,
    GuardsModule,
    AttendanceModule,
    IncidentsModule,
    LocationsModule,
    CheckpointsModule,
    GeofencesModule,
    SosAlertsModule,
    NotificationsModule,
    SitesModule,
    ShiftsModule,
    ReportsModule,
    ComplianceModule,
    TrainingModule,
    MonitoringModule,
    CamerasModule,
  ],
})
export class AppModule {}
