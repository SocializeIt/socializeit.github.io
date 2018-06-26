import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-multi',
  templateUrl: './signup-multi.component.html',
  styleUrls: ['./signup-multi.component.scss']
})
export class SignupMultiComponent implements OnInit {

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }
  signupForm: FormGroup;
  detailForm1: FormGroup;
  detailForm2: FormGroup;  

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['',[
        Validators.pattern('^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]],
      'social_facebook': [''],
      'social_twitter': [''],
      'social_googleplus': [''],
      'firstname': [''],
      'lastname': [''],
      'phone': [''],
      'address': ['']            
    });
    
    this.detailForm1 = this.formBuilder.group({
      'social_facebook': [''],
      'social_twitter': [''],
      'social_googleplus': ['']
    });

    this.detailForm2 = this.formBuilder.group({
      'firstname': [''],
      'lastname': [''],
      'phone': [''],
      'address': ['']
    });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get phone() { return this.signupForm.get('phone'); }
  get address() { return this.signupForm.get('address'); }  
  get social_facebook() { return this.signupForm.get('social_facebook'); }
  get social_twitter() { return this.signupForm.get('social_twitter'); }
  get social_googleplus() { return this.signupForm.get('social_googleplus'); }


  signup() {
    console.log(this.signupForm);
    this._signup();
    this.setUserFormData1(this.auth.user);
    this.setUserFormData2(this.auth.user);
  }

  _signup() {
    console.log(this.signupForm.getRawValue());
    const data = { 
      uid:'',
      email:this.email.value,  
      firstname: this.firstname.value, 
      lastname: this.lastname.value, 
      phone: this.phone.value, 
      address: this.address.value,
      social_facebook: this.social_facebook.value, 
      social_twitter: this.social_twitter.value, 
      social_googleplus: this.social_googleplus.value 
    };
    return this.auth.emailSignup(this.email.value, this.password.value, data)
      .then(s=> this.router.navigate(['profile']));
  }

  setUserFormData1(user) {
    return this.auth.updateUser(user, { social_facebook: this.social_facebook.value, social_twitter: this.social_twitter.value, social_googleplus: this.social_googleplus.value });
  }

  setUserFormData2(user) {
    return this.auth.updateUser(user, { firstname: this.firstname.value, lastname: this.lastname.value });
  }
}
