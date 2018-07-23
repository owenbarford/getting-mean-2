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

  filteredAgents: IAgent[];
  agents: IAgent[];

  _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredAgents = this.listFilter ? this.performFilter(this.listFilter) : this.agents;
    }

  constructor(private supportAppDataService: SupportAppDataService) { }

  performFilter(filterBy: string): IAgent[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.agents.filter((agent: IAgent) =>
          agent.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  private getAgents(): void {
    this.supportAppDataService
      .getAgents()
        .then(foundAgents => {
          this.agents = foundAgents;
          this.filteredAgents = this.agents;
        });
  }

  ngOnInit() {
      this.getAgents();
  }

}
