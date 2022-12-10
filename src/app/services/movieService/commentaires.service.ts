import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private baseUrl = "http://localhost:3000/api/movie/commentaire";
  // private baseUrl = "https://backendtlb.onrender.com/api/movie/commentaire"

  constructor(private http: HttpClient) { }

  
  addLike(idFilm:any, idComment:any, ):Observable<any>{
    const type = {'type':'like'};
    var token = localStorage.getItem('TOKEN');
    if(token==null){
      token = "none";
    }
    var header = {
      headers : new HttpHeaders().set('Authorization', token)
    }
    return this.http.post(`${this.baseUrl}/like/${idFilm}/${idComment}`,type,header);
  }
  addDislike(idFilm:any, idComment:any, ):Observable<any>{
    var token = localStorage.getItem('TOKEN');
    if(token==null){
      token = "none";
    }
    var header = {
      headers : new HttpHeaders().set('Authorization', token)
    }
    const type = {'type':'dislike'};
    return this.http.post(`${this.baseUrl}/like/${idFilm}/${idComment}`,type,header);
  }
  addComment(idFilm:any, commentaire:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/${idFilm}`,commentaire , this.getToken());
  }
  deleteComment(idFilm:any):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${idFilm}` , this.getToken());
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
