import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFormGroup : FormGroup = new FormGroup({});
  user:any;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signUpFormGroup = this._formBuilder.group({
      email:[,Validators.required],
      mdp:[,Validators.required],
      pseudo:[,Validators.required],
      pdp:[,Validators.required]
    })
  }
  inscrire(){
    console.log(this.signUpFormGroup.value)
    
  }
  openSuccessSnackBar() {
    this._snackBar.open('Film ajouté avec succès !', 'OK.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
  openErrorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
}
