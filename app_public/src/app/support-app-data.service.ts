import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Agent } from './home-list/home-list.component';

@Injectable()
export class SupportAppDataService {

  constructor(private http: Http) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  public getAgents(): Promise<Agent[]> {
    // Our code will go in here.
    const url = `${this.apiBaseUrl}/agents`;
    return this.http
     .get(url)
     .toPromise()
    .then(response => response.json() as Agent[])
    .catch(this.handleError);
  }

private handleError(error: any): Promise<any> {
  console.error('Something has gone wrong, error');
  return Promise.reject(error.message || error);
}

}

