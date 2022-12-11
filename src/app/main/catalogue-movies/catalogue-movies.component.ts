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
      theme:['Tous',[Validators.required]],
      noteMax:['5',[Validators.required]]
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
  filtrer(){
    
    let noteMax=this.filtreFormGroup.controls['noteMax'].value;
    let theme =  this.filtreFormGroup.controls['theme'].value;
    let triNotes:any[] =[];
    let triThemes:any[] =[];

    this.movieService.getMoviesByMaxStars(noteMax).subscribe((data)=>{
       triNotes = data;
       if(theme!="Tous"){
        this.movieService.getMoviesByOneTheme(theme).subscribe((data2)=>{
          triThemes = data2;
          this.movies=this.inBoth(triNotes,triThemes);
  
        });
       }else {
        this.movieService.getAllMovies().subscribe((data2)=>{
          triThemes = data2;
          this.movies=this.inBoth(triNotes,triThemes);
        });

       }
   
  
    });

 
  }

// Generic helper function that can be used for the three operations:        
 operation(list1: string | any[], list2: string | any[], isUnion: boolean) {
  var result = [];
  
  for (var i = 0; i < list1.length; i++) {
      var item1 = list1[i],
          found = false;
      for (var j = 0; j < list2.length && !found; j++) {
          found = item1._id === list2[j]._id;
      }
      if (found === !!isUnion) { // isUnion is coerced to boolean
          result.push(item1);
      }
  }
  return result;
}

// Following functions are to be used:
 inBoth(list1: any, list2: any) {
  return this.operation(list1, list2, true);
}

}
