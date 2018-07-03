import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IAgent, IPolicy } from '../_models/index';
// import { appConfig } from '../app.config';
import { environment } from '../../environments/environment';

@Injectable()
export class SupportAppDataService {

  constructor(private http: Http) { }

  policy: IPolicy;

  public getAgents(): Promise<IAgent[]> {
    // environment.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/agents`;
    return this.http
     .get(url)
     .toPromise()
    .then(response => response.json() as IAgent[])
    .catch(this.handleError);
  }

  public getAgentById(agentId: string): Promise<IAgent> {
    // environment.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/agents/${agentId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as IAgent)
      .catch(this.handleError);
  }

  public getPolicies(): Promise<IPolicy[]> {
    // environment.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/policies`;
    return this.http
     .get(url)
     .toPromise()
    .then(response => response.json() as IPolicy[])
    .catch(this.handleError);
  }

  public getPolicyById(_id: string): Promise<IPolicy> {
    // environment.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/policies/${_id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as IPolicy)
      .catch(this.handleError);
  }

  public addNewPolicy(formData: any): Promise<any> {
    // process.env.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/policies`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public updatePolicy(data): Promise<any> {
    // environment.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/policies/${data._id}`;
    return this.http
      .put(url, data)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  public deletePolicy(_id: string): Promise<any> {
    // process.env.API_URL replaces appConfig.apiUrl
    const url = `${environment.API_URL}/policies/${_id}`;
    return this.http
      .delete(url, _id)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

private handleError(error: any): Promise<any> {
  console.error('Something has gone wrong, error');
  return Promise.reject(error.message || error);
}

}

