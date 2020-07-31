import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ManAboutComponent } from './admin/man-about/man-about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule, MatNativeDateModule,
    MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule,
    MatToolbarModule,
    MatTooltipModule, MatTreeModule
} from '@angular/material';
import { ManProjectsComponent } from './admin/man-projects/man-projects.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navigation/navbar.component';
import { IncubateeComponent } from './incubatee/incubatee.component';
import { ProfileComponent } from './incubatee/profile/profile.component';
import { NotificationComponent } from './home/notification/notification.component';
import { AboutComponent } from './home/about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PendingComponent } from './incubatee/pending/pending.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { ActivitiesComponent } from './incubatee/profile/activities/activities.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginNavComponent } from './login/login-nav/login-nav.component';
import { ChartsModule } from 'ng2-charts';


// firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {  AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { CoachComponent } from './coach/coach.component';
import { StudentActivityComponent } from './coach/student-activity/student-activity.component';
import { ResourcesComponent } from './coach/resources/resources.component';
import { SessionComponent } from './coach/session/session.component';
import { ApplicantsComponent } from './coach/applicants/applicants.component';
import { NotificationsComponent } from './coach/notifications/notifications.component';
import { MySettingComponent } from './coach/my-setting/my-setting.component';
import { SplashpgComponent } from './coach/splashpg/splashpg.component';
import { IncubateeTimelineComponent } from './coach/student-activity/incubatee-timeline/incubatee-timeline.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManAboutComponent,
    ManProjectsComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    IncubateeComponent,
    ProfileComponent,
    NotificationComponent,
    AboutComponent,
    NotfoundComponent,
    PendingComponent,
    DialogBoxComponent,
    ActivitiesComponent,
    DashboardComponent,
    LoginNavComponent,
    AccountsComponent,
    CoachComponent,
    StudentActivityComponent,
    ResourcesComponent,
    SessionComponent,
    ApplicantsComponent,
    NotificationsComponent,
    MySettingComponent,
    SplashpgComponent,
    IncubateeTimelineComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule, // step 1
        FormsModule,
        ReactiveFormsModule, // srep 5
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        SlickCarouselModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTabsModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
        SlickCarouselModule,
        MatMenuModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatTreeModule,
        ChartsModule
    ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
