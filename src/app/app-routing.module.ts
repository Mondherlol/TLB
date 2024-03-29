import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { AddMovieComponent } from './forms/add-movie/add-movie.component';
import { LoginComponent } from './forms/login/login.component';
import { SignupComponent } from './forms/signup/signup.component';
import { AccueilComponent } from './main/accueil/accueil.component';
import { CatalogueMoviesComponent } from './main/catalogue-movies/catalogue-movies.component';
import { GamesComponent } from './main/games/games.component';
import { MonProfilComponent } from './main/mon-profil/mon-profil.component';
import { MovieComponent } from './main/movie/movie.component';
import { ProfilComponent } from './main/profil/profil.component';
import { ResultatComponent } from './main/resultat/resultat.component';
import { ErrorPageComponent } from './util/error-page/error-page.component';
import { ChangelogComponent } from './util/changelog/changelog.component';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'games',component:GamesComponent},
  {path:'catalogueMovies',component:CatalogueMoviesComponent},
  {path:'movie/:idMovie',component:MovieComponent},
  {path:'addMovie',component:AddMovieComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'users',component:UsersComponent},
  {path:'resultat/:titre',component:ResultatComponent},
  {path:'profil/:idUser',component:ProfilComponent},
  {path:'monProfil',component:MonProfilComponent},
  {path:'changelog',component:ChangelogComponent},
  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:'**',component:ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash:true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
