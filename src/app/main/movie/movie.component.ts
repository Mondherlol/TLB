import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  excellent=0;
  tresbon=0;
  bon=0;
  moyen=0;
  nul=0;
  @ViewChild('player') player: any;
  videoId: string="";
  moviesLike:any[] =[];    
   themes:any[]=[];

  private routeSub:Subscription=new Subscription();

  movie:any ;

  notes : number [] = [];
  urlStreaming:any;
  idMovie:any;
  urlTrailer:any;
  constructor(private movieService:MoviesService,     private route: ActivatedRoute , private _sanitizer: DomSanitizer  ) { }

  ngOnInit(): void {
    
    this.notes =[];
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    //récuperer film 
    this.routeSub = this.route.params.subscribe((params) => {
 
      this.idMovie = params['idMovie'];
      this.movieService.getMovieById(this.idMovie).subscribe((data) => {
        this.movie = data;
      this.urlStreaming=this._sanitizer.bypassSecurityTrustResourceUrl(data.streaming);
        this.notes=[];
        this.movie.commentaires.forEach((c: any) => {
            this.notes.push(c.note);
        });
        this.moviesLike=[];

         //Récuperer films liés 
         this.movieService.getMoviesByTheme(this.movie).subscribe((filmsTries)=>{
   
           this.moviesLike = filmsTries;
           console.log("Movies Like : ");
           console.log(this.moviesLike);
           console.log(this.movie);
           const pos = this.moviesLike.map(m => m._id).indexOf(this.movie._id); //Récuperer position du film actuel
           this.moviesLike.splice(pos,1); //Et le retirer
           for (var i = this.moviesLike.length - 1; i > 0; i--) { //Melanger les elements du tableau
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.moviesLike[i];
            this.moviesLike[i] = this.moviesLike[j];
            this.moviesLike[j] = temp;
            }
           this.moviesLike.length=3;

    
     
             
        });
   


        this.reinitialiserNotes();
        this.notes.forEach((n: number) => {
          if(n>=18){
            this.excellent++;
          }else if(n>=15){
            this.tresbon++;
          }else if(n>=12){
            this.bon++;
          }else if(n>=9){
            this.moyen++;
          }else {
            this.nul++;
          }
        });
        //
        
        this.videoId=this.youtube_parser(this.movie.trailerURL); //peut causer erreur 


       
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

  refresh(){
    this.ngOnInit();
  }
  reinitialiserNotes(){
    this.excellent = 0;
    this.tresbon = 0;
    this.bon = 0;
    this.moyen=0;
    this.nul=0;

  }
}
