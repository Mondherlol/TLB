import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CommentairesService } from 'src/app/services/movieService/commentaires.service';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-movie-comments',
  templateUrl: './movie-comments.component.html',
  styleUrls: ['./movie-comments.component.scss']
})
export class MovieCommentsComponent implements OnInit {
   @Input() movie :any;
   @Output("refresh") refresh: EventEmitter <any> = new EventEmitter();
   numbers = Array(21).fill(1).map((x,i)=>i);
   connecte=false;
   avis=false;
   currentUser:any = { _id : null};
   userCommentaire:any;
  commentFormGroup: FormGroup = new FormGroup({});
  constructor(private commentaireService:CommentairesService, private router:Router, private userService:UserService, private _formBuilder:FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    //verifier si connecté et recuperer utilisateur connecté
    this.connecte= this.userService.isConnected();
    if( localStorage.getItem('currentUser') != null){
      this.currentUser = localStorage.getItem('currentUser');
      let x= JSON.parse(this.currentUser);
      this.currentUser=x;
    }

  
    //Récuperer commentaire utilisateur
    this.movie.commentaires.forEach((commentaire: any) => {
      if(commentaire.idUser == this.currentUser._id){
        this.avis=true;
        this.userCommentaire=commentaire;
      }
    });

    this.commentFormGroup = this._formBuilder.group({
      note:[,Validators.required],
      avisCourt:[,[Validators.required]],
      avisLong:[,[Validators.required]]
    });


  }

  addNote(){
   
    this.userCommentaire = this.commentFormGroup.value;
    this.userCommentaire.pseudoUser = this.currentUser.pseudo;
    this.userCommentaire.pdpUser = this.currentUser.pdp;
    this.commentaireService.addComment(this.movie._id,this.userCommentaire).subscribe((data)=>{
      this.avis=true;
      this.userCommentaire.like=0;
      this.userCommentaire.dislike=0;
      this.openSuccessSnackBar("Votre avis a été envoyé");
      this.refresh.emit();


      
    })
  }
  addLike(idFilm:String, idComment:String, i:number){
    if( this.connecte) {
      this.commentaireService.addLike(idFilm,idComment).subscribe((data)=>{
        this.refresh.emit();
    });
  }
    else {
      this.openErrorSnackBar("Connectez-vous pour pouvoir liker cet avis.");
    }
  
    
  }
 
  addDislike(idFilm:String, idComment:String, i:number){
    if(this.connecte){
    this.commentaireService.addDislike(idFilm,idComment).subscribe((data)=>{
      this.refresh.emit();

    })
  }
  else {
    this.openErrorSnackBar("Connectez-vous pour pouvoir disliker cet avis.");

    }
  }
  deleteComment(){
    if(this.connecte){
      const response = confirm("Etes vous sûr de vouloir supprimer ce film ?");
      if(response){
        var n = this.userCommentaire.note;
        this.commentaireService.deleteComment(this.movie._id).subscribe((data)=>{
          this.avis=false;

          this.refresh.emit();

  
        });
      }

    }
  }

  //snackBar
  openSuccessSnackBar(msg: string) {
    this._snackBar.open(msg, 'OK.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
  openErrorSnackBar(msg: string) {
    this._snackBar.open(msg, 'OK.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass:  ['error-snackbar'],
    });
  }

}
