import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentairesService } from 'src/app/services/movieService/commentaires.service';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  private routeSub:Subscription=new Subscription();
  idUser:any;
  connecte=false;
  user:any;
  userComments:any[] =[];

  constructor(  private route: ActivatedRoute, private userService:UserService ,private commentService:CommentairesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.connecte= this.userService.isConnected();
    this.routeSub = this.route.params.subscribe((params) => {
      this.idUser = params['idUser'];
        this.userService.getUser(this.idUser).subscribe((data)=>{
            this.user=data;
         
        })
        this.commentService.getUserComments(this.idUser).subscribe((commentaires:any)=>{
          this.userComments=commentaires.userComments;
          console.log(this.userComments);

        })
    });
  }
  addLike(idFilm:String, idComment:String){
    if( this.connecte) {
      this.commentService.addLike(idFilm,idComment).subscribe((data)=>{
          this.ngOnInit()
    });}
    else {
      this.openErrorSnackBar("Connectez-vous pour pouvoir liker cet avis.");
    }
  
  }
 
  addDislike(idFilm:String, idComment:String){
    if(this.connecte){
    this.commentService.addDislike(idFilm,idComment).subscribe((data)=>{
      this.ngOnInit();

    })
  }
  else {
    this.openErrorSnackBar("Connectez-vous pour pouvoir disliker cet avis.");
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
