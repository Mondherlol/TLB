import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movieService/movies.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
  titre:any;
  card:any;
  movies:any[] =[];

  private routeSub:Subscription=new Subscription();
  constructor(private movieService:MoviesService,     private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.titre = params['titre'];
      this.movieService.getMoviesByTitle(this.titre).subscribe((data)=>{
        this.movies = data;
       for (let i = 0; i < this.movies.length; i++) {
          this.movies[i].themes=JSON.parse(data[i].themes);
       }
    
      });
    });
 

  }
  afficher(idFilm:string){
    this.card=document.getElementById(idFilm);
    this.card.firstElementChild.style.paddingTop ="25px";
}
cacher(idFilm:string){
  this.card=document.getElementById(idFilm);
    this.card.firstElementChild.style.paddingTop = "200px";
}

}
