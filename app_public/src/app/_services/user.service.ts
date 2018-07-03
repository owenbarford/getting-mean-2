import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { appConfig } from '../app.config';
import { IUser } from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        // environment.API_URL replaces appConfig.apiUrl
        return this.http.get<IUser[]>(environment.API_URL + '/users');
    }

    getById(_id: string) {
        // environment.API_URL replaces appConfig.apiUrl
        return this.http.get(environment.API_URL + '/users/' + _id);
    }

    create(user: IUser) {
        // environment.API_URL replaces appConfig.apiUrl
        return this.http.post(environment.API_URL + '/users/register', user);
    }

    update(user: IUser) {
        // environment.API_URL replaces appConfig.apiUrl
        return this.http.put(environment.API_URL + '/users/' + user._id, user);
    }

    delete(_id: string) {
        // environment.API_URL replaces appConfig.apiUrl
        return this.http.delete(environment.API_URL + '/users/' + _id);
    }
}
