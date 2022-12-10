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
  constructor(private router:Router, private userService:UserService, private movieService:MoviesService, private _formBuilder:FormBuilder
  ) { }
  
  ngOnInit(): void {


    this.router.events.subscribe( event => {
      if(event.constructor.name === "NavigationEnd") {
        this.connecte= this.userService.isConnected();
        if( localStorage.getItem('currentUser') != null){
          this.currentUser = localStorage.getItem('currentUser');
          let x= JSON.parse(this.currentUser);
          this.currentUser=x;
          console.log(this.currentUser);
        }
      }
    });
    this.movieService.getAllMovies().subscribe((data)=>{
      this.movies = data;
     for (let i = 0; i < this.movies.length; i++) {
      console.log(this.movies[i].themes);
        this.movies[i].themes=JSON.parse(data[i].themes);
        console.log(this.movies[i].themes);
     }
  
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
