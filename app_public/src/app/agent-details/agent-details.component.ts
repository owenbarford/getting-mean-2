import { Component, OnInit, Input } from '@angular/core';

import { IAgent } from '../_models/agent';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {

  @Input() agent: IAgent;

  constructor() { }

  ngOnInit() {
  }

}
