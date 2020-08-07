import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ManAboutComponent} from './admin/man-about/man-about.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './incubatee/profile/profile.component';
import {IncubateeComponent} from './incubatee/incubatee.component';
import {AboutComponent} from './home/about/about.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {PendingComponent} from './incubatee/pending/pending.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AccountsComponent} from './admin/accounts/accounts.component';
import {CoachComponent} from './coach/coach.component';
import {StudentActivityComponent} from './coach/student-activity/student-activity.component';
import {NotificationsComponent} from './coach/notifications/notifications.component';
import {ResourcesComponent} from './coach/resources/resources.component';
import {SessionComponent} from './coach/session/session.component';
import {MySettingComponent} from './coach/my-setting/my-setting.component';
import {SplashpgComponent} from './coach/splashpg/splashpg.component';
import {IncubateeTimelineComponent} from './coach/student-activity/incubatee-timeline/incubatee-timeline.component';
import {StudentListComponent} from './admin/accounts/student-list/student-list.component';
import {CoachListComponent} from './admin/accounts/coach-list/coach-list.component';
import {AnnouncementsComponent} from './admin/announcements/announcements.component';
import {UsersComponent} from './admin/accounts/users/users.component';
import {LandingadminComponent} from './admin/landingadmin/landingadmin.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'aboutUs' , component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'incubatee/:userId', component: IncubateeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'pending', component: PendingComponent},
  {path: 'splashpg' , component: SplashpgComponent},
  {path: 'coach', redirectTo: 'splashpg', pathMatch: 'full'},
  {path: 'coach', component: CoachComponent , children: [
      {path: 'notification' , component: NotificationsComponent},
      {path: 'resources' , component: ResourcesComponent},
      {path: 'session' , component: SessionComponent},
      {path: 'student-activity' , component: StudentActivityComponent},
      {path: 'my-setting' , component: MySettingComponent},
   ]
  },
  {path: 'landingadmin' , component: LandingadminComponent},
  {path: 'dashboard', redirectTo: 'landingadmin', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent , children: [
      {path: 'about', component: ManAboutComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'Announcement', component: AnnouncementsComponent},
    ]
  },
  {path: 'student-activity', component: CoachComponent , children: [
      {path: 'incubateeTimeline', component: IncubateeTimelineComponent},
    ]},
  {path: 'accounts', component: AccountsComponent , children: [
      {path: 'student-list', component: StudentListComponent},
      {path: 'coach-list', component: CoachListComponent},
      {path: 'users' , component: UsersComponent}
    ]
  },
  {path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
