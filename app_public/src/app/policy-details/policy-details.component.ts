import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPolicy } from '../_models/index';
import { SupportAppDataService } from '../_services/index';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
  providers: [SupportAppDataService]
})
export class PolicyDetailsComponent implements OnInit {

  @Input() policy: IPolicy;

  constructor(
    private router: Router,
    private supportAppDataService: SupportAppDataService
  ) { }

  ngOnInit() {
    this.policy = this.policy;
  }

  public deletePolicy() {
    this.supportAppDataService.deletePolicy(this.policy._id)
            .then(res => console.log('Policy deleted'));
            this.router.navigate(['/policies']);
  }

}
