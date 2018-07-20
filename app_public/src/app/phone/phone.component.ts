import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NvmService } from '../_services/nvm.service';
import { AuthenticationService, FilterAgentsService } from '../_services/index';
import * as _ from 'lodash';

@Component({
    selector: 'app-phone',
    templateUrl: 'phone.component.html',
    providers: [NvmService]
})

export class PhoneComponent implements OnInit {
    loading = false;
    returnUrl: string;
    allAgents: any;
    allAvailableAgents: any;
    allAgentStates: any;
    allAgentData: any[] = [];
    visibleAgents: any[];
    orderByField: any;

    pageContent = {
        header: {
          title: 'Phone Info',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private nvmService: NvmService,
        private authenticationService: AuthenticationService,
        public filterAgentsService: FilterAgentsService
    ) { }

    applyFilter(filter) {
        this.visibleAgents = this.filterAgentsService.filterAgents(filter, this.allAgentData);
    }

    ngOnInit(): void {
        // get return url from route parameters or default to '/'
        if (!this.nvmService.isTokenExpired()) {
            console.log('token still good');
        } else {
            console.log('token has expired!');
            this.authenticationService.getToken();
        }
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.nvmService.getAll()
            .subscribe(res => {
                this.allAgents = res[0];
                this.allAvailableAgents = res[1];
                this.allAgentStates = res[2];
                const set1 = this.allAgents;
                const set2 = this.allAvailableAgents['agents'];
                const set3 = this.allAgentStates['stats'];

                _.map(set1).map(function(x) {
                    return _.assign(x, {
                      id: x['id'].toString()
                    });
                  });

                set1.map((element) => {
                     return element.available = 'no';
                 });

                set2.map((element) => {
                    return element.available = 'yes';
                });

                _.map(set1, function(obj) {
                    return _.assign(obj, _.find(set2, {id: obj.id}));
                });

                const set4 = _.keyBy(set3, 'agentId');

                _.map(set1, function(obj) {
                    return _.assign(obj, _.find(set4, {agentId: obj.id}));
                });

                this.allAgentData = set1;
                this.applyFilter('Available');

            });
    }

}
