import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { FirestoreService } from './services/firestore.service';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SignupMultiComponent } from './components/signup-multi/signup-multi.component';

import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SocialcardsListComponent } from './components/socialcards-list/socialcards-list.component';
import { CommunitiesListComponent } from './components/communities-list/communities-list.component';
import { ReadmeComponent } from './components/readme/readme.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    SignupMultiComponent,
    SocialcardsListComponent,
    CommunitiesListComponent,
    ReadmeComponent,
    UserFormComponent
  ],
  schemas: [],
  imports: [
    AppRoutingModule,
    FacebookModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule.forRoot()
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
