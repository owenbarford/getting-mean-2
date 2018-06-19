import { Component, OnInit, Output, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit, AfterViewChecked {

  constructor(
    private alertService: AlertService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef
   ) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
