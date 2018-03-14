import { Component, OnInit } from '@angular/core';
import { SupportAppDataService } from '../support-app-data.service';

export class Agent {
  _id: string;
  name: string;
  role: string;
  roleDesc: string;
  address: string;
  products: [string, string, string];
  team: [string];
}

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

/*   agents: Agent[] = [{
    _id: '5aa26fec31c45d4788b359ec',
    name: 'Owen Barford',
    role: 'Senior Technical Advisor - Support',
    roleDesc: 'Advisor across all technical aspects of our product suite.',
    address: 'Kingston upon Thames, KT2 6SR',
    products: ['Accounts', 'Taxation', 'Technical Services'],
    team: ['Back Office']
  }, {
    _id: '5aa2702631c45d4788b359ed',
    name: 'Kitty Cheung',
    role: 'Team Leader - Accounts & PM',
    roleDesc: 'Team Leader of Accounts & Practice Management Team',
    address: 'Kingston upon Thames, KT2 6SR',
    products: ['Accounts', 'N/A', 'N/A'],
    team: ['Accounts & PM']
  }]; */

  ngOnInit() {
      this.getAgents();
  }

}
