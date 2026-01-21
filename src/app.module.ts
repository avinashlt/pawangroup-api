import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GuardsModule } from './guards/guards.module';
import { SitesModule } from './sites/sites.module';
import { AttendanceModule } from './attendance/attendance.module';
import { IncidentsModule } from './incidents/incidents.module';
import { LocationsModule } from './locations/locations.module';
import { CheckpointsModule } from './checkpoints/checkpoints.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AlertsModule } from './alerts/alerts.module';
import { OperationsModule } from './operations/operations.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        ssl: {
          rejectUnauthorized: false,
        },
        logging: configService.get('NODE_ENV') === 'development',
        extra: {
          // Force IPv4 to avoid IPv6 connection issues
          options: '-c search_path=public',
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    GuardsModule,
    SitesModule,
    AttendanceModule,
    IncidentsModule,
    LocationsModule,
    CheckpointsModule,
    ShiftsModule,
    AlertsModule,
    OperationsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
