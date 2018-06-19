class Stats {
    agentId: number;
    groupId: string;
    stateChangedAt: string;
    state: string;
    duration: string;
    callGuid: string;
  }

export class IAgentStates {
    count: number;
    agents: [Stats];
    }
