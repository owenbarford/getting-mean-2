import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IUser } from '../_models/user';
import { appConfig } from '../app.config';

import * as moment from 'moment';

@Injectable()
export class SupportAppAuthService {

    public currentUser: IUser;
    constructor(private http: Http) {

        this.currentUser = {
            _id: 1234,
            userName: 'Owen Barford',
            firstName: 'Owen',
            lastName: 'Barford',
            hash: '1234',
            password: '12',
            email: 'owen.barford@wolterskluwer.com'
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
        const url = appConfig.apiUrl + '/User';
        return this.http
            .get(url)
            .toPromise()
        .then(response => response.json() as IUser[])
        .catch(this.handleError);
    }

    public getUserById(userId: string): Promise<IUser> {
        const url = `${appConfig.apiUrl}/User/${userId}`;
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
        const url = `${appConfig.apiUrl}/Login`;
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

