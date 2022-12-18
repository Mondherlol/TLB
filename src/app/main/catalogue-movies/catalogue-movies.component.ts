import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModifierFilmComponent } from 'src/app/components/modifier-film/modifier-film.component';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-catalogue-movies',
  templateUrl: './catalogue-movies.component.html',
  styleUrls: ['./catalogue-movies.component.scss']
})
export class CatalogueMoviesComponent implements OnInit {
  triAlpha=false;
  triNote=false;
  charger=false;
  connecte=false;
  currentUser:any;
  movies:any[] =[];
  card:any;
  test:string[]=[];
  modalRef: MdbModalRef<ModifierFilmComponent> | null = null;
  filtreFormGroup : FormGroup = new FormGroup({});


  constructor(
    private movieService:MoviesService,
    private modalService:MdbModalService,
    private _formBuilder:FormBuilder,
    private userService:UserService
    ) { }



  ngOnInit(): void {
    if(localStorage.getItem('currentUser') == null && localStorage.getItem('currentUser')== undefined) this.connecte=false;

        if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){

          this.currentUser = localStorage.getItem('currentUser');

          let x= JSON.parse(this.currentUser);
          this.currentUser=x;
          
          this.connecte= true;
        }
        this.connecte=this.userService.isConnected();
      

    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
      this.charger=true;
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
    this.charger=false;
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
          this.charger=true;
  
        });
       }else {
        this.movieService.getAllMovies().subscribe((data2)=>{
          triThemes = data2;
          this.movies=this.inBoth(triNotes,triThemes);
          this.charger=true;

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

sortAlpha(){
  if(! this.triAlpha){
    this.movies.sort((a,b)=> a.titre.localeCompare(b.titre));
    this.triAlpha=true;
  }else {
    this.movies.sort((a,b)=> b.titre.localeCompare(a.titre));
    this.triAlpha=false;
  }

}
sortNote(){
  if(! this.triNote){
    this.movies.sort((a,b)=> a.note - b.note);
    this.triNote=true;
  }else {
    this.movies.sort((a,b)=> b.note - a.note);
    this.triNote=false;
  }
}
}
