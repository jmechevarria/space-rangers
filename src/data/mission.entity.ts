import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Mission } from '../models/mission.model.js';

export class MissionEntity implements Mission {
  id?: number;
  title: string;
  reward: number;
  active: boolean;
  createdAt = new Date();
  createdBy = 'user';
}
