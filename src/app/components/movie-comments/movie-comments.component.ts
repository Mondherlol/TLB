import { Component, Input, OnInit } from '@angular/core';
import { CommentairesService } from 'src/app/services/movieService/commentaires.service';

@Component({
  selector: 'app-movie-comments',
  templateUrl: './movie-comments.component.html',
  styleUrls: ['./movie-comments.component.scss']
})
export class MovieCommentsComponent implements OnInit {
   @Input() movie :any;
   @Input() moyenne:any;
   @Input() notes:any;
   excellent=0;
   tresbon=0;
   bon=0;
   moyen=0;
   nul=0;

  constructor(private commentaireService:CommentairesService) { }

  ngOnInit(): void {
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


  }

  addLike(idFilm:String, idComment:String){
    this.commentaireService.addLike(idFilm,idComment).subscribe((data)=>{
      this.ngOnInit();
    })
  }

}
