import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-modifier-film',
  templateUrl: './modifier-film.component.html',
  styleUrls: ['./modifier-film.component.scss']
})
export class ModifierFilmComponent implements OnInit {
  id : any | null = null ;
  movieFormGroup : FormGroup = new FormGroup({});
  numbers = Array(21).fill(1).map((x,i)=>i);
  movie:any;
  constructor(
    private _formBuilder: FormBuilder,
    private movieService: MoviesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public modalRef : MdbModalRef<ModifierFilmComponent>
  ) { }

  ngOnInit(): void {
  
      this.movieService.getMovieById(this.id).subscribe((data) => {
        this.movie = data;
        console.log(this.movie);

        this.movieFormGroup.controls['titre'].setValue(data.titre);
        this.movieFormGroup.controls['anneeSortie'].setValue(data.anneeSortie);
        this.movieFormGroup.controls['realisateur'].setValue(data.realisateur);
        this.movieFormGroup.controls['description'].setValue(data.description);
        this.movieFormGroup.controls['trailerURL'].setValue(data.trailerURL);
        this.movieFormGroup.controls['posterURL'].setValue(data.posterURL);
        let i=0;
        data.themes.forEach((t: any) => {
          this.themes.push(this._formBuilder.control(t));
          
          
        });
      });
      this.movieFormGroup = this._formBuilder.group({
        titre:["",Validators.required],
        anneeSortie:[2022,Validators.required],
        description:['',Validators.required],
        posterURL:['',Validators.required],
        realisateur:[''],
        trailerURL:[''],
        themes:this._formBuilder.array([]),

      });
  }
  afficher(){
    // this.movie.titre = this.movieFormGroup.controls['titre'].value;
    this.movie = this.movieFormGroup.value;
    console.log(this.movie);
      this.movieService.updateMovie(this.id,this.movie).subscribe(
      (data) =>{
        this.openSuccessSnackBar();
        this.modalRef.close();
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
    this._snackBar.open('Film modifié avec succès !', 'OK.', {
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

  }

}
