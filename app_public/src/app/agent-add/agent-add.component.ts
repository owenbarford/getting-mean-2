import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAppDataService } from '../_services/index';
import { IAgent } from '../_models/index';

@Component({
    selector: 'app-agent-add',
    templateUrl: 'agent-add.component.html',
    providers: [SupportAppDataService]
})

export class AgentAddComponent implements OnInit {
    returnUrl: string;
    formError: string;
    newAgent: any = {};

    pageContent = {
        header: {
          title: 'Add New Agent',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService,
        private router: Router,
    ) { }

    agent: IAgent[];

    private formIsValid(): boolean {
        // tslint:disable-next-line:max-line-length
        if (this.newAgent.name && this.newAgent.role && this.newAgent.roleDesc && this.newAgent.address && this.newAgent.products && this.newAgent.team) {
            return true;
        } else {
            return false;
        }
    }

    public onAgentSubmit(): void {
        this.formError = '';
        if (this.formIsValid()) {
            console.log(this.newAgent);
            this.supportAppDataService.addNewAgent(this.newAgent)
            .then(agent => {
                console.log('Agent saved', agent);
            });
            this.router.navigate(['/']);
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
