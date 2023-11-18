import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  email: string = '';
  Preferences = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 99, name: 'Documentary' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' }
  ];

  genres: any[] = [{ id: 1, name: "Action" }, { id: 2, name: "Adventure" }, { id: 3, name: "Animation" }, { id: 4, name: "Comedy" }, { id: 5, name: "Documentary" }, { id: 6, name: "Thriller" }, { id: 7, name: "Sci-Fi" }]
  savedPreference: number[] = [];

  getMoviesByPreferences(savedPreferences: number[]): Observable<any> {
    const genresMapping = new Map<number, number>([
      [1, 28], 
      [2, 12],
      [3, 16],
      [4, 35],
      [5, 99],
      [6, 53],
      [7, 878],
      
      
    ]);
  
   
    const tmdbGenres = savedPreferences.map(prefId => genresMapping.get(prefId)).filter(Boolean);
    const apiKey = environment.tmdbApi
   
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${tmdbGenres.join(',')}`;
  
    return this.http.get(apiUrl)
  }
}
