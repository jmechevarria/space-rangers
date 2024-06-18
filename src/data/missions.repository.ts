import { Injectable } from '@nestjs/common';
import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
// import * as FileSync from 'lowdb/adapters/FileSync';
// import * as _ from 'lodash';
import _ from 'lodash';
import { plainToClass } from 'class-transformer';
import { MissionEntity } from './mission.entity.js';

interface GoSpaceRangerDb {
  missions: MissionEntity[];
}

@Injectable()
export class MissionsRepository {
  db: LowSync<GoSpaceRangerDb>;

  constructor() {
    // const adapter = new FileSync('./src/server/app/data/db.json');
    // this.db = lowdb(adapter);
    const adapter = new JSONFileSync<GoSpaceRangerDb>(
      './src/server/app/data/db.json',
    );
    this.db = new LowSync<GoSpaceRangerDb>(adapter, defaultData);
    // this.db.defaults(defaultData).write();
  }

  async getList(params: any = {}) {
    // let db = this.db.get('missions');
    // let db = this.db.read();
    const data = this.db.data;
    let { missions } = data;
    if (params.sort) {
      // db = db.sortBy(params.sort);
      missions.sort(params.sort); //sortBy(params.sort);
    }
    if (typeof params.active === 'boolean') {
      missions = missions.filter((x) => x.active === params.active);
    }

    if (params.page && params.pageSize) {
      const start = (params.page - 1) * params.pageSize;
      missions = missions.slice(start, start + params.pageSize);
    }

    return await missions.map((x) => {
      const entity = plainToClass(MissionEntity, x, { ignoreDecorators: true });

      return entity;
    });
  }

  // async get(id: number) {
  //   const dbRecord = await this.db
  //     .get('missions')
  //     .find((x) => x.id === id)
  //     .value();
  //   if (dbRecord) {
  //     dbRecord.createdAt = new Date(dbRecord.createdAt);
  //     return plainToClass(MissionEntity, dbRecord, { ignoreDecorators: true });
  //   }
  // }

  // async create(mission: MissionEntity) {
  //   this.validate(mission);
  //   const missions = await this.getList();
  //   const maxId = _.max(missions.map((x) => x.id));
  //   mission.id = maxId + 1;
  //   this.db.get('missions').push(mission).write();
  //   return await mission;
  // }

  // async update(id: number, mission: MissionEntity) {
  //   this.validate(mission);
  //   this.db
  //     .get('missions')
  //     .find((x) => (x.id as any) === id)
  //     .assign(mission)
  //     .write();
  //   return await mission;
  // }

  // async delete(id: number) {
  //   this.db.get('missions').remove({ id }).write();
  // }

  private validate(mission: MissionEntity) {
    if (!mission.title) {
      throw new Error('DBConstraint error: title is required');
    }
    if (!_.isNumber(mission.reward)) {
      throw new Error('DBConstraint error: reward is required');
    }
    if (!mission.createdBy) {
      throw new Error('DBConstraint error: CreatedBy is required');
    }
    if (!mission.createdAt || !_.isDate(mission.createdAt)) {
      throw new Error('DBConstraint error: CreatedAt is invalid or not sent');
    }
  }
}

const defaultData = {
  missions: [
    {
      id: 1,
      title: 'Rescue cat stuck in asteroid',
      reward: 500,
      active: true,
      createdBy: 'user',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Escort Royal Fleet',
      reward: 5000,
      active: true,
      createdBy: 'user',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Pirates attacking the station',
      reward: 2500,
      active: false,
      createdBy: 'user',
      createdAt: new Date(),
    },
  ],
};
