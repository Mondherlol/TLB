import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss']
})

export class ModifierProfilComponent implements OnInit {
  user: any | null = null;
  modifyProfil : FormGroup = new FormGroup({});
  
  constructor(public modalRef: MdbModalRef<ModifierProfilComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    
    ) { }


  ngOnInit(): void {
    this.modifyProfil = this._formBuilder.group({
      email:[this.user.email,[Validators.required,Validators.email]],     
      pseudo:[this.user.pseudo,[Validators.required,Validators.minLength(4)]],
      pdp:[this.user.pdp,Validators.required],
      pdc:[this.user.pdc,Validators.required]
    } ,
    )
  }
  modifierProfil(){
    this.user = this.modifyProfil.value;
    console.log(this.user);
    //   this.movieService.updateMovie(this.id,this.movie).subscribe(
    //   (data) =>{
    //     this.openSuccessSnackBar();
    //     this.modalRef.close();
    //   },
    //   (error)=>{
    //     this.openErrorSnackBar(error.statusText);
    //   }
    // );
    this.userService.updateUser(this.user._id, this.user).subscribe(
      (response)=>{
        this.openSuccessSnackBar();
        this.modalRef.close();
      },
      (error)=>{
        this.openErrorSnackBar(error.statusText);
      }
    )
  }
  
  //VALIDATORS
  isInvalidPseudo(){
    return this.modifyProfil.controls['pseudo'].errors?.["required"] && this.modifyProfil.controls['pseudo'].touched;
  }
  isShortPseudo(){
    return this.modifyProfil.controls['pseudo'].errors?.["minlength"] && this.modifyProfil.controls['pseudo'].dirty;
  }
  isInvalidEmail(){
    return this.modifyProfil.controls['email'].errors?.["required"] && this.modifyProfil.controls['email'].touched;
  }
  isIncorrectEmail(){
    return this.modifyProfil.controls['email'].errors?.["email"] && this.modifyProfil.controls['email'].touched;
  }
  isInvalidPdp(){
    return this.modifyProfil.controls['pdp'].errors?.["required"] && this.modifyProfil.controls['pdp'].touched;
  }
  isInvalidPdc(){
    return this.modifyProfil.controls['pdc'].errors?.["required"] && this.modifyProfil.controls['pdc'].touched;
  }
  openSuccessSnackBar() {
    this._snackBar.open('Compte modifié avec succès !', 'OK.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
  openErrorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass:  ['error-snackbar'],
    });
  }


}
