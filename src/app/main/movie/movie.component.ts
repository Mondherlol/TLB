import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @ViewChild('player') player: any;
  videoId: string="";

  private routeSub:Subscription=new Subscription();
  movies:any[] =[];
  movie:any;
  notes : number [] = [];
  moyenne = 0;
  idMovie:any;
  urlTrailer:any;
  constructor(private movieService:MoviesService,     private route: ActivatedRoute , private _sanitizer: DomSanitizer  ) { }

  ngOnInit(): void {
    this.moyenne = 0;
    this.notes =[];
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.routeSub = this.route.params.subscribe((params) => {
      this.idMovie = params['idMovie'];
      this.movieService.getMovieById(this.idMovie).subscribe((data) => {
        this.movie = data;
        this.movie.commentaires.forEach((c: any) => {
          console.log(c);
            this.notes.push(c.note);
            this.moyenne+=c.note;
    
        });
        this.moyenne=this.moyenne/this.notes.length;
        if (Number.isNaN(this.moyenne)) {this.moyenne=0;}
        this.videoId=this.youtube_parser(this.movie.trailerURL); //peut causer erreur 


       
      });
    });
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
     for (let i = 0; i < this.movies.length; i++) {
        this.movies[i].themes=JSON.parse(data[i].themes);
     }
  
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  onReady() {
    this.player.playVideo();   
    this.player.mute();     
 
  }
  onStateChange(event:any) {
    if (event.data === 0) {
      this.player.playVideo();  
    }
  }
   youtube_parser(url:any){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;

}

  refresh(){
    this.ngOnInit();
  }
}
