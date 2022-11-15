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
  movie:any;
  idMovie:any;
  urlTrailer:any;
  constructor(private movieService:MoviesService,     private route: ActivatedRoute , private _sanitizer: DomSanitizer  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.routeSub = this.route.params.subscribe((params) => {
      this.idMovie = params['idMovie'];
      console.log(this.idMovie)
      this.movieService.getMovieById(this.idMovie).subscribe((data) => {
        this.movie = data;
        this.videoId=this.youtube_parser(this.movie.trailerURL);
       
      });
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
}
