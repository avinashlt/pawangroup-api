import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuardsController } from './guards.controller';
import { GuardsService } from './guards.service';
import { Guard, GuardSchema } from '../../schemas/guard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guard.name, schema: GuardSchema }]),
  ],
  controllers: [GuardsController],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
