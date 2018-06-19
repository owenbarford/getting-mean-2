import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  pageContent = {
    header: {
      title: 'SupportApp',
      strapLine: 'Find information on the Support Team!'
    },
    sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
  };

  constructor () {
  }

  ngOnInit() {
  }
}
