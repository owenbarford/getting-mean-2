import { Component, OnInit } from '@angular/core';
import { SupportAppDataService } from '../support-app-data.service';
import { Agent } from '../agent';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [SupportAppDataService]
})
export class HomeListComponent implements OnInit {

  constructor(private supportAppDataService: SupportAppDataService) { }

  agents: Agent[];

  private getAgents(): void {
    this.supportAppDataService
      .getAgents()
        .then(foundAgents => {
          this.agents = foundAgents;
        });
  }

  ngOnInit() {
      this.getAgents();
  }

}
