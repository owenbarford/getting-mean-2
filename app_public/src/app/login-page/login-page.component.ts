import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportAppAuthService } from '../_services/support-app-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [SupportAppAuthService],
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent implements OnInit {

  pageContent = {
      header: {
        title: 'Login to SupportApp',
        strapLine: 'Find information on the Support Team!'
      },
      sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
    };

  constructor(private supportAppAuthService: SupportAppAuthService, private router: Router) {
  }

  login() {
    // this.supportAppAuthService.loginUser(
    //   formValues.userName,
    //   formValues.password);
    this.router.navigate(['']);
  }

  cancel() {
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
