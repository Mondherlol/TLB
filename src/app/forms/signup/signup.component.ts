import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/movieService/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl| null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control?.parent?.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.touched);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFormGroup : FormGroup = new FormGroup({});
  user:any;
  isAlreadyUsedEmail:boolean = false;
  image: any;

  
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.signUpFormGroup = this._formBuilder.group({
      email:[,[Validators.required,Validators.email]],
      mdp:['',[Validators.required,Validators.minLength(5)]],
     
      pseudo:[,[Validators.required,Validators.minLength(4)]],
      pdp:[,Validators.required],
      confirmMdp:[''],
    } , { validator : this.checkPasswords}
    )
  }


  inscrire(){
      this.user = this.signUpFormGroup.value;
      this.user.pdp = this.image;

      console.log(this.user);

      var form_data = new FormData();

      for (var key in this.user){
        form_data.append(key,this.user[key]);
      }
      this.userService.userExist(this.user).subscribe(  //On vérifie si l'utilisateur existe
        (res)=>{              
              if(res){
                  if(res.existe==false){  //existe pas
                      this.userService.signup(form_data).subscribe( //on l'enregistre
                        (res)=>{              
                              if(res){
                                //Inscription réussie
                                this.openSuccessSnackBar();
                                this.router.navigate(["/login"]);
                
                              }
                              else {
                                //erreur serveur
                                this.openErrorSnackBar('Erreur serveur');
                              }
                              },
                          (err)=>{
                            //erreur de création de compte
                            console.log(err);
                            this.openErrorSnackBar("Une erreur est survenue");
                           
                          }
                         )
                  }else { //Existe deja
                    this.openErrorSnackBar("Utilisateur existe déjà.");
                    this.isAlreadyUsedEmail=true;
                  }
              }
              else {
                console.log("erreur");
              }
              },
          (err)=>{
            console.log("erreur");
          }
         )

   
    
  }
  
  openSuccessSnackBar() {
    this._snackBar.open('Compte créé avec succès !', 'OK.', {
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

  //VALIDATORS
  isInvalidPseudo(){
    return this.signUpFormGroup.controls['pseudo'].errors?.["required"] && this.signUpFormGroup.controls['pseudo'].touched;
  }
  isShortPseudo(){
    return this.signUpFormGroup.controls['pseudo'].errors?.["minlength"] && this.signUpFormGroup.controls['pseudo'].dirty;
  }
  isInvalidEmail(){
    return this.signUpFormGroup.controls['email'].errors?.["required"] && this.signUpFormGroup.controls['email'].touched;
  }
  isIncorrectEmail(){
    return this.signUpFormGroup.controls['email'].errors?.["email"] && this.signUpFormGroup.controls['email'].touched;
  }
  isInvalidMdp(){
    return this.signUpFormGroup.controls['mdp'].errors?.["required"] && this.signUpFormGroup.controls['mdp'].touched;
  }
  isShortMdp(){
    return this.signUpFormGroup.controls['mdp'].errors?.["minlength"] && this.signUpFormGroup.controls['mdp'].dirty;
  }
  isInvalidPdp(){
    return this.signUpFormGroup.controls['pdp'].errors?.["required"] && this.signUpFormGroup.controls['pdp'].touched;
  }
  resetEmail(){
    this.isAlreadyUsedEmail=false;
  }
  filechoosen(event: any) {

    if (event.target.value) {
      this.signUpFormGroup.value.pdp = <File>event.target.files[0];
      this.image = <File>event.target.files[0];
      console.log(this.image);

    }
  }
    
  checkPasswords(group: FormGroup) {
    let mdp = group.controls.mdp.value;
    let confirmMdp = group.controls.confirmMdp.value;

    return mdp === confirmMdp ? null : { notSame: true}
  }

}
