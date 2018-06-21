import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { LoginComponent } from '../login/index';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/index';
import { AuthGuard } from '../_guards/index';
import { PhoneComponent } from '../phone/index';
import { PhoneStatesComponent } from '..//phone-states/index';
import { PoliciesComponent } from '..//policies/index';
import { DetailsPolicyPageComponent } from '../details-policy-page/details-policy-page.component';
import { PolicyAddComponent } from '../policy-add/policy-add.component';

const routes: Routes = [{
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agent/:agentId',
    component: DetailsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'phone',
    component: PhoneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'phonestates',
    component: PhoneStatesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'policies',
    component: PoliciesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'policies/:_id',
    component: DetailsPolicyPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newpolicy',
    component: PolicyAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
