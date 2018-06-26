import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    filteredPolicies: IPolicy[];
    policies: IPolicy[];

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredPolicies = this.listFilter ? this.performFilter(this.listFilter) : this.policies;
    }

    pageContent = {
        header: {
          title: 'Policies & Procedures',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService,
        private router: Router
    ) { }

    performFilter(filterBy: string): IPolicy[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.policies.filter((policy: IPolicy) =>
            policy.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    private getPolicies(): void {
      this.supportAppDataService
        .getPolicies()
          .then(foundPolicies => {
            this.policies = foundPolicies;
            this.filteredPolicies = this.policies;
          });
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getPolicies();
    }

    cancel() {
      this.router.navigate(['']);
    }
}
