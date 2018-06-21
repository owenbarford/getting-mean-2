import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportAppDataService } from '../_services/support-app-data.service';
import { IPolicy } from '../_models/index';

@Component({
    selector: 'app-policies',
    templateUrl: 'policies.component.html',
    providers: [SupportAppDataService]
})

export class PoliciesComponent implements OnInit {
    loading = false;
    returnUrl: string;

    pageContent = {
        header: {
          title: 'Policies & Procedures',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService
    ) { }

    policies: IPolicy[];

    private getPolicies(): void {
      this.supportAppDataService
        .getPolicies()
          .then(foundPolicies => {
            this.policies = foundPolicies;
          });
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.getPolicies();

    }
}
