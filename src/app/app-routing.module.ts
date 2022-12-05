import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { AddMovieComponent } from './forms/add-movie/add-movie.component';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { AccueilComponent } from './main/accueil/accueil.component';
import { CatalogueMoviesComponent } from './main/catalogue-movies/catalogue-movies.component';
import { GamesComponent } from './main/games/games.component';
import { MovieComponent } from './main/movie/movie.component';
import { ErrorPageComponent } from './util/error-page/error-page.component';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'games',component:GamesComponent},
  {path:'catalogueMovies',component:CatalogueMoviesComponent},
  {path:'movie/:idMovie',component:MovieComponent},
  {path:'addMovie',component:AddMovieComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'users',component:UsersComponent},
  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:'**',component:ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
