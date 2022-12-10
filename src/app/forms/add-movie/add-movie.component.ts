import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  movieFormGroup : FormGroup = new FormGroup({});
  numbers = Array(21).fill(1).map((x,i)=>i);
  movie:any;
  constructor(
    private _formBuilder: FormBuilder,
    private movieService: MoviesService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movieFormGroup = this._formBuilder.group({
      titre:['',Validators.required],
      anneeSortie:[2022,Validators.required],
      description:['',Validators.required],
      posterURL:['',Validators.required],
      note:[3],
      themes:this._formBuilder.array([]),
      realisateur:[''],
      trailerURL:['https://youtu.be/dFlDRhvM4L0'],
      userId:['fldslkl'],
      avisCourt:[],
      avisLong:[]

    });
  }
  afficher(){
    this.movie=this.movieFormGroup.value;
    console.log(this.movie);
      this.movieService.addMovie(this.movie).subscribe(
      (data) =>{
        this.openSuccessSnackBar();
        this.router.navigateByUrl('/catalogueMovies');
      },
      (error)=>{
        this.openErrorSnackBar(error.statusText);
      }
    );
  }

  public get themes(){
    return this.movieFormGroup.get('themes') as FormArray;
  }
  isInvalidTitre(){
    return this.movieFormGroup.controls['titre'].invalid && this.movieFormGroup.controls['titre'].touched;
  }
  isInvalidRealisateur(){
    return this.movieFormGroup.controls['realisateur'].invalid && this.movieFormGroup.controls['realisateur'].touched;
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
  onAjouterTheme(){
    
    this.themes.push(this._formBuilder.control(''));
    for(let t of this.themes.controls){
      console.log(t.value);
    }
    console.log(this.movieFormGroup.controls['themes'].value);
  }
}
