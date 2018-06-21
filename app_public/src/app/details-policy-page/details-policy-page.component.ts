import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SupportAppDataService } from '../_services/index';

import 'rxjs/add/operator/switchMap';

import { IPolicy } from '../_models/index';

@Component({
  selector: 'app-details-policy-page',
  templateUrl: './details-policy-page.component.html',
  styleUrls: ['./details-policy-page.component.css']
})
export class DetailsPolicyPageComponent implements OnInit {
  pageContent = {
    header : {
      title : '',
      strapline : ''
    },
    sidebar : ''
  };

  constructor(
    private supportAppDataService: SupportAppDataService,
    private route: ActivatedRoute
  ) { }

  newPolicy: IPolicy;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = params.get('_id');
        return this.supportAppDataService.getPolicyById(id);
      })
      .subscribe((newPolicy: IPolicy) => {
        this.newPolicy = newPolicy;
        this.pageContent.header.title = newPolicy.title;
        this.pageContent.sidebar = `${newPolicy.title}`;
      });
  }

}
