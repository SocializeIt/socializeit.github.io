import { Component, OnInit } from '@angular/core';
import * as Github from 'github-api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  gh: Github;
  me: any;
  constructor() { 
    this.gh = new Github({
      username: 'mouadcherkaoui',
      password: 'PdynamicW!014'
    });
    this.me = this.gh.getUser();
    console.log(this.me);
    this.me.listNotifications(function(err, notification) {
      console.log(notification);
    });
  }

  ngOnInit() {
    console.log('oninit: ');
    this.me = this.gh.getUser();
    console.log(this.me);
    this.me.listNotifications(function(err, notification) {
      console.log(notification);
    });  
  }

}
