import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ManAboutComponent} from './admin/man-about/man-about.component';
import {ManProjectsComponent} from './admin/man-projects/man-projects.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './incubatee/profile/profile.component';
import {IncubateeComponent} from './incubatee/incubatee.component';
import {AboutComponent} from './home/about/about.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {PendingComponent} from './incubatee/pending/pending.component';
import {CoachComponent} from './coach/coach.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AccountsComponent} from './admin/accounts/accounts.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs' , component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'incubatee', component: IncubateeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'pending', component: PendingComponent},
  {path: 'coach', component: CoachComponent},
  {path: 'dashboard', component: DashboardComponent , children: [
      {path: 'about', component: ManAboutComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'projects', component: ManProjectsComponent},
    ]
  },
  {path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
