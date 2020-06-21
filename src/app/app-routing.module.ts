import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ManAboutComponent} from './admin/man-about/man-about.component';
import {ManServicesComponent} from './admin/man-services/man-services.component';
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
import { AuthGuard } from './service/auth-guard.service';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: ManAboutComponent},
  {path: 'aboutUs' , component: AboutComponent},
  {path: 'service', component: ManServicesComponent},
  {path: 'projects', component: ManProjectsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'incubatee/:userId', component: IncubateeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'pending/:applicantId', component: PendingComponent},
  {path: 'coach', component: CoachComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
