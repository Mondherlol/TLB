import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connecte:Boolean=false;
  pseudo="Mondher Mhamdi";

  currentUser:any;
  constructor(private router:Router, private userService:UserService
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
  }
 

  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.ngOnInit();
  }
}
