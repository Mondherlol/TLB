import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movieService/movies.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  movies:any[] =[];
  card:any;
  test:string[]=[];


  constructor(private movieService:MoviesService) { }



  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
     for (let i = 0; i < this.movies.length; i++) {
        this.movies[i].themes=JSON.parse(data[i].themes);
     }
  
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
