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
    
    this.router.events.subscribe( event => {

      if(event.constructor.name === "NavigationEnd" ) {
        console.log("x");

        console.log("CurrentUser avant conexxion ="+this.currentUser);
        
        if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){
          console.log('CurrentUser ='+this.currentUser);

          this.currentUser = localStorage.getItem('currentUser');

          let x= JSON.parse(this.currentUser);
          this.currentUser=x;
          console.log("test:");
          console.log(this.currentUser);
          
          this.connecte= true;
        }
      }
    });
   }
  
  ngOnInit(): void {
    if(localStorage.getItem('currentUser') == null && localStorage.getItem('currentUser')== undefined) this.connecte=false
         
    // if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){
    //   console.log('CurrentUser ='+this.currentUser);
    //   this.currentUser = localStorage.getItem('currentUser');
    //   let x= JSON.parse(this.currentUser);
    //   this.currentUser=x;
    //   console.log(this.currentUser);
    //   this.connecte=true;
    // }
 
    // this.connecte= this.userService.isConnected();
    // console.log("connecte ="+this.connecte);


    
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
