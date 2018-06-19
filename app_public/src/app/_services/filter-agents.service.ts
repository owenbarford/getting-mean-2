import { Injectable } from '@angular/core';

@Injectable()
export class FilterAgentsService {
    constructor() { }

    filterAgents(filter, allAgentData) {
        if (!filter) {
          return allAgentData;
        }

        if (filter === 'Core') {
          return this.showOnlyCoreAgents(allAgentData);
        }

        if (filter === 'Available') {
          return this.showOnlyAvailableAgents(allAgentData);
        }

        return allAgentData.filter(a => a.agentTeam.startsWith(filter));
      }

      showOnlyCoreAgents(allAgentData) {
      return allAgentData.filter(a =>
        a.agentCore === 1);
      }

      showOnlyAvailableAgents(allAgentData) {
        return allAgentData.filter(a =>
          a.available === 'yes');
      }
}
