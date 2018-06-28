import { Injectable } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook'
@Injectable({
  providedIn: 'root'
})
export class FbService {

  initParams: InitParams = {
    appId: '1234566778',
    xfbml: true,
    version: 'v2.8'
  };

  constructor(private fb: FacebookService) {
    this.fb.init(this.initParams);
   }
}
