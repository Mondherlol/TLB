import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './main/accueil/accueil.component';
import { GamesComponent } from './main/games/games.component';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'games',component:GamesComponent},
  {path:'',redirectTo:'accueil',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
