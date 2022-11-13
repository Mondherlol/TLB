import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  movieFormGroup : FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private movieService: MoviesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.movieFormGroup = this._formBuilder.group({
      _id:['69'],
      titre:['',Validators.required],
      anneeSortie:[2022,Validators.required],
      description:['',Validators.required],
      posterURL:['',Validators.required],
      note:[3],
      themes:["",Validators.required],
      userId:['fldslkl']


    });
  }
  afficher(){
    console.log(this.movieFormGroup.value);
    this.movieService.addMovie(this.movieFormGroup.value).subscribe(
      (data) =>{
        this.openSuccessSnackBar();
        console.log("Ajouté avec succès !");
      },
      (error)=>{
        this.openErrorSnackBar(error.statusText);
        console.log("Erreur d'ajout.")
      }
    );
 
  }
  isInvalidTitre(){
    return this.movieFormGroup.controls['titre'].invalid && this.movieFormGroup.controls['titre'].touched;
  }
  isInvalidGenre(){
    return this.movieFormGroup.controls['themes'].invalid && this.movieFormGroup.controls['themes'].touched;
  }
  isInvalidImage(){
    return this.movieFormGroup.controls['posterURL'].invalid && this.movieFormGroup.controls['posterURL'].touched;
  }
  isInvalidDescription(){
    return this.movieFormGroup.controls['description'].invalid && this.movieFormGroup.controls['description'].touched;
  }
  isFormValid(){
    if(!this.isInvalidTitre){
      return true;
    } 
    else {
      return false;
    }
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
