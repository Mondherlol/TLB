import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private baseUrl = "http://localhost:3000/api/movie/commentaire";

  constructor(private http: HttpClient) { }

  
  addLike(idFilm:any, idComment:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/like/${idFilm}/${idComment}`);
  }
}
