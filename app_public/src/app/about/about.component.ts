import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  pageContent = {
    header : {
      title : 'About SupportApp',
      strapline : ''
    },
    // tslint:disable-next-line:max-line-length
    content : 'SupportApp was created to give better visibility of Support Team information. The current limitations of the NewVoiceMedia Wallboard prompted the need for a new application that was capable of utilising the NVM API to display various IVR related information across the entire support team with a completely device agnostic approach. SupportApp will work on a desktop, tablet and phone and has multiple display formats to cope with the available screen real estate of each device. \n\n SupportApp also displays other information pertinent to the Support Team such as consultant information and policies & procedures. \n\nSupportApp is written using the MEAN stack of platforms and frameworks to create both the front and backend components. Deployment is via the Salesforce Heroku platform. \n\nM = Mongoose (Database) \n\nE = Express (Web Server) \n\nA = Angular (JavaScript Framework) \n\n N = Node (Backend Server) \n\n SupportApp is easy to navigate and simple to use, requiring absolutely no end-user training (unlike OneClick). \n\nSupportApp is the creation of the WKUK Support Team.'
  };

  constructor() { }

  ngOnInit() {
  }

}
