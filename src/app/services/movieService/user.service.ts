import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/api/user/";

  constructor(
    private http : HttpClient,
    ){ }

  currentUser : Observable<any> = new Observable<any>;
  userToken: any;

  signup(user: any):Observable<any>{
    return this.http.post(`${this.baseUrl}signup`,user);
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}login`,user);
  };


}
