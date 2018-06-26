import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAppDataService, AuthenticationService } from '../_services/index';
import { IPolicy } from '../_models/index';

@Component({
    selector: 'app-policy-add',
    templateUrl: 'policy-add.component.html',
    providers: [SupportAppDataService, AuthenticationService]
})

export class PolicyAddComponent implements OnInit {
    returnUrl: string;
    formError: string;
    newPolicy: any = {};

    pageContent = {
        header: {
          title: 'Add New Policy',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

    policies: IPolicy[];

    private formIsValid(): boolean {
        if (this.newPolicy.title && this.newPolicy.policyText) {
            return true;
        } else {
            return false;
        }
    }

    public onPolicySubmit(): void {
        this.formError = '';
        if (this.formIsValid()) {
            const user = this.authenticationService.getUser();
            const userName = user['firstName'] + ' ' + user['lastName'];
            this.newPolicy.createdBy = userName;
            this.supportAppDataService.addNewPolicy(this.newPolicy)
            .then(policy => {
                console.log('Policy saved', policy);
            });
            this.router.navigate(['/policies']);
        } else {
            this.formError = 'All fields required, please try again';
        }
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

     }

     cancel() {
        this.router.navigate(['']);
      }
}
