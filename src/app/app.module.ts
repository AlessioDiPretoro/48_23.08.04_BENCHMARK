import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbAlertModule,
  NgbCollapseModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreferListComponent } from './pages/prefer-list/prefer-list.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardSingleMeteoComponent } from './components/card-single-meteo/card-single-meteo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PreferListComponent,
    AlertComponent,
    CardSingleMeteoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
