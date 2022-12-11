import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // private baseUrl = "http://localhost:3000/api/movie"
  private baseUrl = "https://backendtlb.onrender.com/api/movie"
  constructor(private http: HttpClient) { }
  getAllMovies():Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  };
  addMovie(movie:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,movie,this.getToken());
  };
  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,this.getToken());
  }
  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, movie,this.getToken());
  }
  getMovieById(id:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getMoviesByTheme(themes:any):Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/theme`,themes);
  };
  getMoviesByTitle(titre:any):Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/titre/${titre}`);
  };
  getMoviesByMaxStars(stars:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/stars/${stars}`);
  };
  getMoviesByOneTheme(theme:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/theme/${theme}`);
  };

  

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

