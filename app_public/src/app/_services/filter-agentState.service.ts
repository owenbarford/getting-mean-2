import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class FilterAgentStateService {
    constructor() { }

    filterAgentStates(filter, allAgentStates) {
        if (!filter || filter === 'xxxx') {
          return allAgentStates;
        }

        return allAgentStates.filter(a => a.agentId === filter);
    }

    filterAgentStateInfo(filter, allAgentStates) {
      if (allAgentStates.length > 0) {
        if (filter === 'Latest') {
            return allAgentStates.filter(a => {
              const now = moment(new Date());
              const source = moment(a.stateChangedAt);
              if (now.diff(source, 'minutes') <= 30) {
                return a;
              }
            });
        }
        if (filter === '120') {
          return allAgentStates.filter(a => {
            const now = moment(new Date());
            const source = moment(a.stateChangedAt);
            if (now.diff(source, 'minutes') <= 120) {
              return a;
            }
          });
        }
        if (filter === '240') {
          return allAgentStates.filter(a => {
            const now = moment(new Date());
            const source = moment(a.stateChangedAt);
            if (now.diff(source, 'minutes') <= 240) {
              return a;
            }
          });
        }
        if (filter === '480') {
          return allAgentStates.filter(a => {
            const now = moment(new Date());
            const source = moment(a.stateChangedAt);
            if (now.diff(source, 'minutes') <= 480) {
              return a;
            }
          });
        }
      } else {
        console.log('no data to filter');
      }
    }
}
