import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { appConfig } from '../app.config';
import { INvmToken  } from '../_models/index';
import { NvmService } from '../_services/nvm.service';

@Injectable()
export class AuthenticationService {

    public token: INvmToken;

    constructor(
            private http: HttpClient,
            private nvmService: NvmService
    ) { }

    getToken() {
        if (this.nvmService.isTokenExpired) {
            const tempToken: {} = JSON.parse(localStorage.getItem('currentUser'));
            localStorage.removeItem('currentUser');
            localStorage.removeItem('tokenExpiry');
            this.nvmService.getNvmToken()
                .subscribe((data: INvmToken) => {
                    this.token = data;
                    tempToken['token'] = this.token['access_token'];
                    localStorage.setItem('currentUser', JSON.stringify(tempToken));
                    localStorage.setItem('tokenExpiry', JSON.stringify(this.token['expires_at']));
            });
        } else {
            this.nvmService.getNvmToken()
            .subscribe((data: INvmToken) => {
                    this.token = data;
            });
        }
    }

    login(userName: string, password: string) {

        this.getToken();

        return this.http.post<any>(appConfig.apiUrl + '/users/authenticate', { userName: userName, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.token = this.token['access_token'];
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('tokenExpiry', JSON.stringify(this.token['expires_at']));
                }
                return user;
            });
    }

    isAuthenticated() {
        return !!localStorage.getItem('currentUser');
    }

    getUser() {
        if (localStorage.getItem('currentUser')) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            return user;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
