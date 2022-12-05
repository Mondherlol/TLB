import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/movieService/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:any[] =[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data)=>{
      this.users = data;
      console.log(data);
    });
  }
  supprimer(idUser:string){
    const response = confirm("Etes vous sûr de vouloir supprimer cet utilisateur ?");
    if(response){
      this.userService.deleteUser(idUser).subscribe((data)=>{
            this.ngOnInit();
          });
    }
   
  }

}
