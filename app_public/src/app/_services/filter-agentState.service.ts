import { Injectable } from '@angular/core';

@Injectable()
export class FilterAgentStateService {
    constructor() { }

    filterAgentStates(filter, allAgentStates) {
        if (!filter || filter === 'xxxx') {
          return allAgentStates;
        }

        return allAgentStates.filter(a => a.agentId === filter);
      }

}
