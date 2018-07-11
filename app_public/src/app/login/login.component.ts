import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IUser } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    user: IUser;
    result: any;

    pageContent = {
        header: {
          title: 'Login to SupportApp',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.userName, this.model.password)
            .map(
                user => {
                    this.user = user;
                    return this.user;
                })
                .subscribe(() => {
                    // it takes a couple of milliseconds to get the token into local storage!
                    // if we don't have the local storage then AuthGuard won't work
                    setTimeout(() => this.router.navigate([this.returnUrl]), 50);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
}
