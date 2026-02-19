import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CamerasController } from './cameras.controller';
import { CamerasService } from './cameras.service';
import { Camera, CameraSchema } from '../../schemas/camera.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Camera.name, schema: CameraSchema }])],
  controllers: [CamerasController],
  providers: [CamerasService],
  exports: [CamerasService],
})
export class CamerasModule {}
