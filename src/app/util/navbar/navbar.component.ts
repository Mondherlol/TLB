import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connecte:Boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.connecte = localStorage.getItem('TOKEN') != null && localStorage.getItem('TOKEN') != undefined;
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.ngOnInit();
  }
}
