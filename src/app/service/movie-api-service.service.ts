import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = environment.tmdbApi;


  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}`);
  }


  // trendingmovieapidata 
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  }

  // searchmovive
  // getSearchMovie(data: any): Observable<any> {
  //   console.log(data, 'movie#');

  //   return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  // }
  getSearchMovie(data: any): Observable<any> {
    const { movieName, genre, actor } = data;

    let apiUrl = `${this.baseurl}/discover/movie?api_key=${this.apikey}&language=en-US&sort_by=popularity.desc`;

    // Add movie name parameter if it's provided
    if (movieName) {
        apiUrl += `&with_text_query=${movieName}`;
    }

    // Include genre parameter if selected
    if (genre) {
        apiUrl += `&with_genres=${genre}`;
    }

    // Search for actor's ID based on the provided actor name
    if (actor) {
        const actorSearchUrl = `https://api.themoviedb.org/3/search/person?api_key=${this.apikey}&query=${actor}`;
        
        // Perform actor search
        return this.http.get(actorSearchUrl).pipe(
            mergeMap((actorData: any) => {
                if (actorData.results && actorData.results.length > 0) {
                    const actorId = actorData.results[0].id; // Assuming the first result is the desired actor
                    apiUrl += `&with_cast=${actorId}`;
                }
                // Perform movie search after obtaining the actor's ID
                return this.http.get(apiUrl);
            })
        );
    }

    // If no actor search is needed, directly perform the movie search
    return this.http.get(apiUrl);
}


  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
  }
  // action 
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=99`);
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=878`);
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&sort_by=popularity.desc&with_genres=53`);
  }

}
