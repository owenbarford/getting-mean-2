import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HomeListComponent } from './home-list/home-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HtmlLineBreaksPipe } from './_helpers/html-line-breaks.pipe';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { DetailsPageComponent } from './details-page/details-page.component';
// import { LoginComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider, LoadingSpinnerComponent, OrderByPipe } from './_helpers/index';
import {
  AlertService,
  AuthenticationService,
  UserService,
  SupportAppAuthService,
  SupportAppDataService,
  NvmService,
  FilterAgentsService,
  FilterAgentStateService
} from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { PhoneComponent } from './phone/index';
import { PhoneStatesComponent } from './phone-states/index';

@NgModule({
  declarations: [
    HomeListComponent,
    AlertComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    PageHeaderComponent,
    SidebarComponent,
    HtmlLineBreaksPipe,
    AgentDetailsComponent,
    DetailsPageComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PhoneComponent,
    PhoneStatesComponent,
    LoadingSpinnerComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [ LoadingSpinnerComponent ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    NvmService,
    UserService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    SupportAppAuthService,
    SupportAppDataService,
    FilterAgentsService,
    FilterAgentStateService
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }