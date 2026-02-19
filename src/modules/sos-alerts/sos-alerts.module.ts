import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SosAlertsController } from './sos-alerts.controller';
import { SosAlertsService } from './sos-alerts.service';
import { SosAlert, SosAlertSchema } from '../../schemas/sos-alert.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SosAlert.name, schema: SosAlertSchema }])],
  controllers: [SosAlertsController],
  providers: [SosAlertsService],
  exports: [SosAlertsService],
})
export class SosAlertsModule {}
