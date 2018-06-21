import { Component, OnInit, Input } from '@angular/core';

import { IPolicy } from '../_models/index';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  @Input() policy: IPolicy;

  constructor() { }

  ngOnInit() {
  }

}
