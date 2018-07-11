import { Component, OnInit } from '@angular/core';
import { SupportAppDataService } from '../_services/support-app-data.service';
import { IAgent } from '../_models/agent';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [SupportAppDataService]
})
export class HomeListComponent implements OnInit {

  constructor(private supportAppDataService: SupportAppDataService) { }

  agents: IAgent[];

  private getAgents(): void {
    this.supportAppDataService
      .getAgents()
        .then(foundAgents => {
          this.agents = foundAgents;
        });
  }

  ngOnInit() {
      // console.log(localStorage.getItem('currentUser'));
      this.getAgents();
  }

}
