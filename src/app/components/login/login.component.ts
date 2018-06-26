import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const builder = new FormBuilder();
    this.loginForm = builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  
  login() {
    if(this.loginForm.valid) {
      this.auth.emailLogin(this.email.value, this.password.value)
        .then(u => {
          if(u) {
            this.router.navigate([`profile`])
          }
        });
    }
  }

  googleLogin() {
    this.auth.googleLogin();
  }

}
