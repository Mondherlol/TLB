import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './util/navbar/navbar.component';
import { AccueilComponent } from './main/accueil/accueil.component';
import { GamesComponent } from './main/games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMovieComponent } from './forms/add-movie/add-movie.component';
import { ErrorPageComponent } from './util/error-page/error-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogueMoviesComponent } from './main/catalogue-movies/catalogue-movies.component';
import { MovieComponent } from './main/movie/movie.component';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    GamesComponent,
    AddMovieComponent,
    ErrorPageComponent,
    CatalogueMoviesComponent,
    MovieComponent,
    LoginComponent,
    SignupComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    YouTubePlayerModule,
    MdbFormsModule,
    MdbCollapseModule,
    MdbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
