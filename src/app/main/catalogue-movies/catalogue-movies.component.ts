import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movieService/movies.service';

@Component({
  selector: 'app-catalogue-movies',
  templateUrl: './catalogue-movies.component.html',
  styleUrls: ['./catalogue-movies.component.scss']
})
export class CatalogueMoviesComponent implements OnInit {

  movies:any[] =[];
  card:any;
  test:string[]=[];


  constructor(private movieService:MoviesService) { }



  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
     for (let i = 0; i < this.movies.length; i++) {
      console.log(this.movies[i].themes);
        this.movies[i].themes=JSON.parse(data[i].themes);
        console.log(this.movies[i].themes);
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
  deleteMovie(idFilm:string){
    const response = confirm("Etes vous sûr de vouloir supprimer ce film ?");
    if(response){
      this.movieService.deleteMovie(idFilm).subscribe((data)=>{
            this.ngOnInit();
          });
    }
   
   
  }
}
