import { Component, OnInit, Input } from '@angular/core';

import { Agent } from '../agent';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {

  @Input() agent: Agent;

  constructor() { }

  ngOnInit() {
  }

}
