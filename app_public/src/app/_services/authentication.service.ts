import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// import { appConfig } from '../app.config';
import { INvmToken  } from '../_models/index';
import { NvmService } from '../_services/nvm.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    public token: INvmToken;

    constructor(
            private http: HttpClient,
            private nvmService: NvmService
    ) { }

    // there is a problem with the logic here during first login! Need to cross check.
    getToken() {
        console.log('start of token grab');
        if (this.nvmService.isTokenExpired && localStorage.getItem('currentUser')) {
            const tempToken: {} = JSON.parse(localStorage.getItem('currentUser'));
            console.log('token expired and current user exists');
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
                    console.log(data);
            });
        }
    }

    login(userName: string, password: string) {
        // environment.env.API_URL replaces appConfig.apiUrl
        return this.http.post<any>(environment.API_URL + '/users/authenticate', { userName: userName, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // now get the NVM token and add to user.token
                    this.nvmService.getNvmToken()
                        .subscribe((data: INvmToken) => {
                            if (data) {
                                this.token = data;
                                user.token = this.token['access_token'];
                                localStorage.setItem('currentUser', JSON.stringify(user));
                                localStorage.setItem('tokenExpiry', JSON.stringify(this.token['expires_at']));
                                return user;
                            } else {
                                // NVMAPI has not returned a token for us to use.
                                console.log('no response from NVMAPI');
                            }
                        });
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
        localStorage.removeItem('tokenExpiry');
    }

}
