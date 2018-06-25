import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { SocialcardsListComponent } from '../components/socialcards-list/socialcards-list.component';
import { CommunitiesListComponent } from '../components/communities-list/communities-list.component';
import { ReadmeComponent } from '../components/readme/readme.component';
import { SignupMultiComponent } from '../components/signup-multi/signup-multi.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: SignupMultiComponent},
  { path: 'login', component: LoginComponent},
  { path: 'social-cards', component: SocialcardsListComponent},
  { path: 'communities', component: CommunitiesListComponent},
  { path: 'readme', component: ReadmeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
