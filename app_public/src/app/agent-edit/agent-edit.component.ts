import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupportAppDataService } from '../_services/index';
import { IAgent } from '../_models/index';

@Component({
    selector: 'app-agent-edit',
    templateUrl: 'agent-edit.component.html',
    providers: [SupportAppDataService]
})

export class AgentEditComponent implements OnInit {

    agent: IAgent;
    editAgentForm: FormGroup;
    returnUrl: string;
    loading = false;

    pageContent = {
        header: {
          title: 'Edit Agent',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService,
        private router: Router,
    ) {
    }

    updateAgent() {
        this.loading = true;
        this.supportAppDataService.updateAgent(this.editAgentForm.value)
            .then(
                data => {
                    console.log('Agent updated');
                    this.router.navigate(['/']);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.route.paramMap
          .switchMap((params: ParamMap) => {
            const id = params.get('_id');
            return this.supportAppDataService.getAgentById(id);
        })
        .subscribe((agent: IAgent) => {
            const _id = new FormControl(agent._id);
            const name = new FormControl(agent.name, [Validators.required]);
            const role = new FormControl(agent.role, [Validators.required]);
            const roleDesc = new FormControl(agent.roleDesc, [Validators.required]);
            const address = new FormControl(agent.address, [Validators.required]);
            const products = new FormControl(agent.products, [Validators.required]);
            const team = new FormControl(agent.team, [Validators.required]);
            const days1 = new FormControl(agent.workingTimes['0'].days, [Validators.required]);
            const start1 = new FormControl(agent.workingTimes['0'].start, [Validators.required]);
            const end1 = new FormControl(agent.workingTimes['0'].end, [Validators.required]);
            const closed1 = new FormControl(agent.workingTimes['0'].closed, [Validators.required]);
            this.editAgentForm = new FormGroup({
                name: name,
                role: role,
                roleDesc: roleDesc,
                address: address,
                products: products,
                team: team,
                days1: days1,
                start1: start1,
                end1: end1,
                closed1: closed1,
                _id: _id
            });
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      }

     cancel() {
        this.router.navigate(['']);
      }
}
