import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './forms/add-movie/add-movie.component';
import { AccueilComponent } from './main/accueil/accueil.component';
import { GamesComponent } from './main/games/games.component';
import { ErrorPageComponent } from './util/error-page/error-page.component';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'games',component:GamesComponent},
  {path:'addMovie',component:AddMovieComponent},
  {path:'',redirectTo:'accueil',pathMatch:'full'},
  {path:'**',component:ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
