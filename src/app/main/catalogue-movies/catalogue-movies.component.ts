import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModifierFilmComponent } from 'src/app/components/modifier-film/modifier-film.component';
import { MoviesService } from 'src/app/services/movieService/movies.service';

@Component({
  selector: 'app-catalogue-movies',
  templateUrl: './catalogue-movies.component.html',
  styleUrls: ['./catalogue-movies.component.scss']
})
export class CatalogueMoviesComponent implements OnInit {

  movies:any[] =[];
  card:any;
  test:string[]=[];
  modalRef: MdbModalRef<ModifierFilmComponent> | null = null;
  filtreFormGroup : FormGroup = new FormGroup({});


  constructor(
    private movieService:MoviesService,
    private modalService:MdbModalService,
    private _formBuilder:FormBuilder
    ) { }



  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
    });
    this.filtreFormGroup = this._formBuilder.group({
      theme:[,[Validators.required]],
    });

  }
  afficher(idFilm:string){
      this.card=document.getElementById(idFilm);
      this.card.firstElementChild.style.paddingTop ="25px";
  }
  cacher(idFilm:string){
    this.card=document.getElementById(idFilm);
      this.card.firstElementChild.style.paddingTop = "200px";
  }
  deleteMovie(idFilm:string){
    const response = confirm("Etes vous sûr de vouloir supprimer ce film ?");
    if(response){
      this.movieService.deleteMovie(idFilm).subscribe((data)=>{
            this.ngOnInit();
          });
    }
  }
  modifierMovie(idFilm:String){
    this.modalRef = this.modalService.open(ModifierFilmComponent,{
      modalClass: 'modal-xl',
      data : {
        id : idFilm
      }
    });
  }
  filtrerParTheme(){
    console.log(this.filtreFormGroup.controls['theme'].value);
    this.movieService.getMoviesByOneTheme(this.filtreFormGroup.controls['theme'].value).subscribe((data)=>{
      this.movies = data;
    });
  }
}
