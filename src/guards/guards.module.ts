import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';
import { Guard } from './entities/guard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guard])],
  controllers: [GuardsController],
  providers: [GuardsService],
  exports: [GuardsService],
})
export class GuardsModule {}
