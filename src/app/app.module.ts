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
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { ManServicesComponent } from './admin/man-services/man-services.component';
import { ManProjectsComponent } from './admin/man-projects/man-projects.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { IncubateeComponent } from './incubatee/incubatee.component';
import { ProfileComponent } from './incubatee/profile/profile.component';
import { NotificationComponent } from './home/notification/notification.component';
import { AboutComponent } from './home/about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CoachComponent } from './coach/coach.component';
import { PendingComponent } from './incubatee/pending/pending.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ManAboutComponent,
    ManServicesComponent,
    ManProjectsComponent,
    ProjectDetailsComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    IncubateeComponent,
    ProfileComponent,
    NotificationComponent,
    AboutComponent,
    NotfoundComponent,
    CoachComponent,
    PendingComponent,
    ResourcesComponent
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
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
