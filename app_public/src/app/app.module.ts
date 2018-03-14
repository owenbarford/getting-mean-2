import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HomeListComponent } from './home-list/home-list.component';


@NgModule({
  declarations: [
    HomeListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [HomeListComponent]
})
export class AppModule { }
