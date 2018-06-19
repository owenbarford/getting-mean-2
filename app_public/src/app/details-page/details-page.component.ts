import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SupportAppDataService } from '../_services/index';

import 'rxjs/add/operator/switchMap';

import { IAgent } from '../_models/agent';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  pageContent = {
    header : {
      title : '',
      strapline : ''
    },
    // tslint:disable-next-line:max-line-length
    sidebar : ''
  };

  constructor(
    private supportAppDataService: SupportAppDataService,
    private route: ActivatedRoute
  ) { }

  newAgent: IAgent;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('agentId');
        return this.supportAppDataService.getAgentById(id);
      })
      .subscribe((newAgent: IAgent) => {
        this.newAgent = newAgent;
        this.pageContent.header.title = newAgent.name;
        this.pageContent.sidebar = `${newAgent.name} is listed in SupportApp because they are a consultant working for the Support Team.`;
      });
  }

}
