import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MissionEntity } from '../data/mission.entity.js';
import { User } from '../models/user.model.js';
import { Roles } from '../util/roles.decorator.js';
import { MissionsService } from './missions.service.js';
import { GetUser } from '../util/getuser.decorator.js';

@Controller('missions')
export class MissionsController {
  constructor(private missionsService: MissionsService) {}

  @Get()
  getMissions() {
    return this.missionsService.getMissions();
  }
}
