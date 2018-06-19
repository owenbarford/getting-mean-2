import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService, AlertService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from '../_models/index';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-ms-input-placeholder { color: #999; }
  `],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private userName: FormControl;
  private firstName: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private _id: FormControl;

  currentUser: IUser;
  loading = false;

  pageContent = {
    header: {
      title: 'Your Profile in SupportApp',
      strapLine: 'Find information on the Support Team!'
    },
    sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
  };

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    console.log(this.currentUser);
    const userName = new FormControl(this.currentUser.userName, [Validators.required]);
    const firstName = new FormControl(this.currentUser.firstName, [Validators.required]);
    const lastName = new FormControl(this.currentUser.lastName, [Validators.required]);
    const email = new FormControl(this.currentUser.email, [Validators.required]);
    const _id = new FormControl(this.currentUser._id);
    this.profileForm = new FormGroup({
       userName: userName,
       firstName: firstName,
       lastName: lastName,
       email: email,
       _id: _id
     });
  }

  updateUser(profileForm) {
      this.loading = true;
      this.userService.update(this.profileForm.value)
          .subscribe(
              data => {
                  this.alertService.success('Profile update successful', true);
                  this.authService.logout();
                  this.router.navigate(['/agents']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

  cancel() {
    this.router.navigate(['']);
  }

}
