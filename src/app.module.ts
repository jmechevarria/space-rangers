import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MissionsController } from './missions/missions.controller.js';
import { MissionsService } from './missions/missions.service.js';
import { MissionsRepository } from './data/missions.repository.js';

@Module({
  imports: [],
  controllers: [AppController, MissionsController],
  providers: [AppService, MissionsService, MissionsRepository],
})
export class AppModule {}
