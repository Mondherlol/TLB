import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { ModifierProfilComponent } from 'src/app/forms/modifier-profil/modifier-profil.component';
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
  modalRef: MdbModalRef<ModifierProfilComponent> | null = null;

  constructor( private router:Router, private userService:UserService ,private commentService:CommentairesService,private _snackBar: MatSnackBar,private modalService: MdbModalService) { }

  ngOnInit(): void {


      if( localStorage.getItem('userId') != null){
        this.idUser = localStorage.getItem('userId');
        this.userService.getUser(this.idUser).subscribe((data)=>{
          this.user=data;
          localStorage.setItem('currentUser',JSON.stringify(data));

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

    modifierProfil(){
      this.modalRef = this.modalService.open(ModifierProfilComponent, {
        data: { user: this.user },
      });
      this.modalRef.onClose.subscribe( ()=>{
          this.ngOnInit();

      })
    }
}
