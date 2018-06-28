import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUser(creds) {
    let b = `${creds.username}:${creds.password}`;
    this.http.get(`https://api.github.com/users/mouadcherkaoui`, {
      headers: new HttpHeaders().set('Authorization', `Basic ${btoa(b)}`)
    }).toPromise().then(c => console.log(c));
  }
}

