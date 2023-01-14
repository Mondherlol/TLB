import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movieService/movies.service';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connecte:Boolean=false;
  movies:any[] =[];
  searchFormGroup : FormGroup = new FormGroup({});

  currentUser:any;
  constructor(private router:Router, private userService:UserService, private movieService:MoviesService, private _formBuilder:FormBuilder,
    
  ) {
    

   }
  
  ngOnInit(): void {
    if(localStorage.getItem('currentUser') == null && localStorage.getItem('currentUser')== undefined) this.connecte=false;
    this.router.events.subscribe( event => {
      

        
        if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){

          this.currentUser = localStorage.getItem('currentUser');

          let x= JSON.parse(this.currentUser);
          this.currentUser=x;
          
          this.connecte= true;
        }
      
    });

    
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
    });
    this.searchFormGroup = this._formBuilder.group({
      titre:[,[Validators.required]],
    } 
    )
  }
 
  search(){
    let titre = this.searchFormGroup.controls['titre'].value;
    this.router.navigateByUrl('/resultat/'+titre);
  
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.ngOnInit();
  }
}
