import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = "http://localhost:3000/api/user/";
  private baseUrl = "https://backendtlb.onrender.com/api/user/"

  
  constructor(
    private http : HttpClient,
    ){ }

  currentUser : Observable<any> = new Observable<any>;
  userToken: any;



  userExist(user:any):Observable<any>{
    return  this.http.post(`${this.baseUrl}exist`,user);
   }

  signup(user: any):Observable<any>{
    return this.http.post(`${this.baseUrl}signup`,user);
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}login`,user);
  };

  isConnected():boolean{
  return  localStorage.getItem('TOKEN') != null && localStorage.getItem('TOKEN') != undefined;
  }
  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  };
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,this.getToken()
    );
  }
  getUser(idUser:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/${idUser}`);
  }
  
  getToken(){
    var token = localStorage.getItem('TOKEN');
    if(token==null){
      token = "none";
    }
    var header = {
      headers : new HttpHeaders().set('Authorization', token)
    }
    return header;
  }
  
  
 
}
