// I don't think we use this service anywhere in the app.

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';

import { IUser } from '../_models/user';
// import { appConfig } from '../app.config';
import { environment } from '../../environments/environment';

@Injectable()
export class SupportAppAuthService {

    public currentUser: IUser;
    constructor(private http: Http) {

    this.currentUser = {
            _id: 1234,
            userName: 'FredSmith',
            firstName: 'Fred',
            lastName: 'Smith',
            hash: '1234',
            password: '12',
            email: 'fred.smith@hotmail.com'
        };
    }

    loginUser() {
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
      }

    isAuthenticated() {
        return !!this.currentUser;
    }

    public getUsers(): Promise<IUser[]> {
        // environment.API_URL replaces appConfig.apiUrl
        const url = environment.API_URL + '/User';
        return this.http
            .get(url)
            .toPromise()
        .then(response => response.json() as IUser[])
        .catch(this.handleError);
    }

    public getUserById(userId: string): Promise<IUser> {
        // environment.API_URL replaces appConfig.apiUrl
        const url = `${environment.API_URL}/User/${userId}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as IUser)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong, error');
        return Promise.reject(error.message || error);
    }

    public login(formValues): void {
        // environment.API_URL replaces appConfig.apiUrl
        const url = `${environment.API_URL}/Login`;
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    public logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
      }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public isLoggedOut() {
        return !this.isLoggedIn();
    }

    public getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}

