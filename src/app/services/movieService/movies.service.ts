import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = "http://localhost:3000/api/movie"

  constructor(private http: HttpClient) { }
  getAllMovies():Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  };
  addMovie(movie:any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,movie);
  };
}
