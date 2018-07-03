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
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider, LoadingSpinnerComponent, OrderByPipe } from './_helpers/index';
// tslint:disable-next-line:max-line-length
import { AlertService, AuthenticationService, UserService, SupportAppDataService, NvmService, FilterAgentsService, FilterAgentStateService} from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { PhoneComponent } from './phone/index';
import { PhoneStatesComponent } from './phone-states/index';
import { PoliciesComponent } from './policies/index';
import { DetailsPolicyPageComponent } from './details-policy-page/details-policy-page.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { PolicyAddComponent } from './policy-add/policy-add.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';

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
    PoliciesComponent,
    DetailsPolicyPageComponent,
    PolicyDetailsComponent,
    PolicyAddComponent,
    PolicyEditComponent,
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
    SupportAppDataService,
    FilterAgentsService,
    FilterAgentStateService
  ],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
