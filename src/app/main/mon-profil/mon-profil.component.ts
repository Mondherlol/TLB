import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentairesService } from 'src/app/services/movieService/commentaires.service';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent implements OnInit {

  private routeSub:Subscription=new Subscription();
  idUser:any;
  connecte:Boolean=false;
  user:any;
  userComments:any[] =[];

  constructor( private router:Router, private userService:UserService ,private commentService:CommentairesService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {


      if( localStorage.getItem('userId') != null){
        this.idUser = localStorage.getItem('userId');
        this.userService.getUser(this.idUser).subscribe((data)=>{
          this.user=data;
      });
        
        this.commentService.getUserComments(this.idUser).subscribe((commentaires:any)=>{
          this.userComments=commentaires.userComments;
          console.log(this.userComments);

        })
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
