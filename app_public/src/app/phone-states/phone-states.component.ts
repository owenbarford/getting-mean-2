import { Component, OnInit } from '@angular/core';
import { NvmService } from '../_services/nvm.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, FilterAgentStateService } from '../_services/index';
import * as _ from 'lodash';

@Component({
    selector: 'app-phonestates',
    templateUrl: 'phone-states.component.html',
    providers: [NvmService]
})

export class PhoneStatesComponent implements OnInit {

    loading = false;
    returnUrl: string;
    allAgentStates: any;
    listAgents: any;
    visibleAgentStates: any[];
    orderByField: any;

    pageContent = {
        header: {
          title: 'Phone Agent State Info',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    applyFilter(filter) {
        this.visibleAgentStates = this.filterAgentStateService.filterAgentStates(filter, this.allAgentStates);
    }

    applyInterval(filter) {
        console.log(filter);
        this.visibleAgentStates = this.filterAgentStateService.filterAgentStateInfo(filter, this.allAgentStates);
    }

    constructor(
        private route: ActivatedRoute,
        private nvmService: NvmService,
        private authenticationService: AuthenticationService,
        public filterAgentStateService: FilterAgentStateService
    ) {}

    ngOnInit () {
        if (this.nvmService.isTokenExpired()) {
            this.authenticationService.getToken();
        }

        this.nvmService.getAll()
        .subscribe(res => {
            this.listAgents = res[0];
            this.allAgentStates = res[2];
            this.listAgents.unshift({id: 'xxxx', name: 'All'});

            const set1 = this.listAgents;
            const set2 = this.allAgentStates['stats'];

            _.map(set1).map(function(x) {
                return _.assign(x, {
                  id: x['id'].toString()
                });
              });

             _.map(set2, function(obj) {
                return _.assign(obj, _.find(set1, {id: obj.agentId}));
            });

            this.allAgentStates = set2;
            this.applyFilter('xxxx');

        });

         // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

}



