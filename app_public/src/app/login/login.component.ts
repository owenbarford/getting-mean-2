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
                    // it takes a couple of milliseconds (locally) to 2 seconds online to get the token into local storage!
                    // if we don't have the local storage then AuthGuard won't work
                    setTimeout(() => this.router.navigate([this.returnUrl]), 2000);
                    // bit of a hack here but if we don't manage to navigate due to token issues then we drop out of loading
                    setTimeout(() => this.loading = false, 2000);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
}
