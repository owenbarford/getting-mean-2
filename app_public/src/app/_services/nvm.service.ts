import { Injectable, state } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import { isDate } from 'date-fns';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/toArray';

import { appConfig } from '../app.config';
import { INvmToken, IAvailAgents, IListAgents, IAgentStates } from '../_models/index';


@Injectable()
export class NvmService {
    constructor(
        private http: HttpClient
    ) { }

    public getNvmToken() {
        return this.http.get<INvmToken>(appConfig.nvmApiUrl + '/nvm')
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    public getAvailAgents() {
        const url = `${appConfig.nvmDataUrl}/${appConfig.clientId}/agents/?availability=readyForPhoneCall`;
        return this.http.get<IAvailAgents>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getAgentStates() {
        const url = `${appConfig.nvmDataUrl}/${appConfig.clientId}/statistics/agentstates?interval=360`;
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json; version=2');
        return this.http.get<IAgentStates>(url, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public getListAgents() {
        const url = `${appConfig.apiUrl}/listagents`;
        return this.http.get<IListAgents[]>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    getList(): Observable<any> {
        const url = `${appConfig.apiUrl}/listagents`;
        return Observable.from(this.http.get<IListAgents[]>(url));
    }

    getAvail(): Observable<any> {
        const url = `${appConfig.nvmDataUrl}/${appConfig.clientId}/agents/?availability=readyForPhoneCall`;
        return Observable.from(this.http.get<IAvailAgents>(url));
    }

    getState(): Observable<any> {
        const url = `${appConfig.nvmDataUrl}/${appConfig.clientId}/statistics/agentstates?latest=true`;
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/json; version=2');
        return Observable.from(this.http.get<IAgentStates>(url, { headers: headers }));
    }

    getAll(): Observable<any> {
        return Observable.forkJoin(this.getList(), this.getAvail(), this.getState());
    }

    public getAllAgentDetails() {
        const listAgents$ = Observable.from(this.getListAgents());
        const availAgents$ = Observable.from(this.getAvailAgents());
        const statesAgents$ = Observable.from(this.getAgentStates());
        const temp1$ = listAgents$
            .concatMap(arr => Observable.from(arr));
        const temp2$ = availAgents$
            .map(x => x['agents'])
            .concatMap(arr => Observable.from(arr));
        const temp3$ = statesAgents$
            .map(x => x['stats'])
            .concatMap(arr => Observable.from(arr));

        return temp1$
            .concatMap(agent => {
                const avail$ = Observable.from(temp2$)
                // tslint:disable-next-line:triple-equals
                    .filter(available => available['id'] == agent['id']);

                const stats$ = Observable.from(temp3$)
                // tslint:disable-next-line:triple-equals
                    .filter(stats => stats['agentId'] == agent['id'])
                    .takeLast(1);

                return Observable.forkJoin(avail$, stats$, (available, stats) => {
                    return {
                        'id': agent['id'],
                        'name': agent['name'],
                        'team': agent['agentTeam'],
                        'core': agent['agentCore'],
                        'available': 'Yes', // available['id'],
                        'lastState': stats['state'],
                        'timeInLastState': stats['duration']
                    };
                });
            })
            .toArray();
    }

    public isTokenExpired() {
        const tokenExpiresAt = new Date(localStorage.getItem('tokenExpiry').replace('Z', '').substring(1, 20));
        const today = new Date();

        if (tokenExpiresAt) {
          if (isDate(tokenExpiresAt)) {
            if (tokenExpiresAt < today) {
                return true;
            } else {
                return false;
            }
          } else {
              console.log('something went wrong converting the locally stored token date!');
          }
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong, error');
        return Promise.reject(error.message || error);
    }

}