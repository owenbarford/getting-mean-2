class WorkingTimes {
    days: string;
    start: string;
    end: string;
    closed: boolean;
}

export class IAgent {
    _id: string;
    name: string;
    role: string;
    roleDesc: string;
    address: string;
    products: [string, string, string];
    team: [string];
    workingTimes: [WorkingTimes];
  }
