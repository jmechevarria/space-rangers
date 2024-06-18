import { Injectable } from '@nestjs/common';
import { MissionEntity } from '../data/mission.entity.js';
import { MissionsRepository } from '../data/missions.repository.js';

@Injectable()
export class MissionsService {
  constructor(private missionsRepository: MissionsRepository) {}

  getMissions() {
    return this.missionsRepository.getList();
  }
}
