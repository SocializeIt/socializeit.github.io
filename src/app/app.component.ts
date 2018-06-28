import { Component } from '@angular/core';
import { GithubService } from './core/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  /**
   *
   */
  constructor(private ghsvc: GithubService) {
    ghsvc.getUser({username:'mouadcherkaoui', password: 'PdynamicW!014'});
  }
}
