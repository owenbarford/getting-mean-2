import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IAgent } from '../_models/agent';
import { appConfig } from '../app.config';

@Injectable()
export class SupportAppDataService {

  constructor(private http: Http) { }

  public getAgents(): Promise<IAgent[]> {
    const url = `${appConfig.apiUrl}/agents`;
    return this.http
     .get(url)
     .toPromise()
    .then(response => response.json() as IAgent[])
    .catch(this.handleError);
  }

  public getAgentById(agentId: string): Promise<IAgent> {
    const url = `${appConfig.apiUrl}/agents/${agentId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as IAgent)
      .catch(this.handleError);
  }

private handleError(error: any): Promise<any> {
  console.error('Something has gone wrong, error');
  return Promise.reject(error.message || error);
}

}

