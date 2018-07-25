import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SupportAppDataService } from '../_services/index';
import { IAgent } from '../_models/agent';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {

  @Input() agent: IAgent;

  constructor(
      private supportAppDataService: SupportAppDataService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  public deleteAgent() {
    this.supportAppDataService.deleteAgent(this.agent._id)
            .then(res => console.log('Agent deleted'));
            this.router.navigate(['/']);
  }

}
