import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { NewsApiModel } from './newsApiModel';
import { Article } from './article';
import { AuthService } from './auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHttpHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("jwt_token"),
      'Content-Type': 'application/json',
      'userId': this.authService.getUserId()
    });
    return headers;
  }

  //gets all the movies that are matching the input from tmdb
  getSearchedNews(name: string, page: number = 0, pagesize: number = 5): Observable<NewsApiModel> {
    page++;
    const endpoint = `${environment.searchEndpoint}/${name}/${page}/${pagesize}`;
    let headers = this.getHttpHeaders();
    return this.http.get(endpoint, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.pickApiResponse)
    );
  }

  //return top news 
  getTopNews(page: number = 0, pagesize: number = 5): Observable<NewsApiModel> {
    page++;
    const endpoint = `${environment.topnewsEndpoint}/${page}/${pagesize}`;
    let headers = this.getHttpHeaders();
    return this.http.get(endpoint, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.pickApiResponse)
    );
  }

  //returns category specific news
  getCategoryWiseNews(category: string, page: number = 0, pagesize: number = 5): Observable<NewsApiModel> {
    page++;
    const endpoint = `${environment.categoryEndpoint}/${category}/${page}/${pagesize}`;
    let headers = this.getHttpHeaders();
    return this.http.get(endpoint, { headers: headers }).pipe(
      retry(3),
      catchError(this.handleError),
      map(this.pickApiResponse)
    );
  }

  //returns the response
  pickApiResponse(response) {
    return response;
  }

  //returns all the articles from the database
  getWatchListedArticles(): Observable<Array<Article>> {
    let headers = this.getHttpHeaders();
    return this.http.get<Array<Article>>(environment.watchlistEndpoint, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  //method will add the article to watchlist and saves to the database
  addArticleTowatchlist(article: Article): Observable<Article> {
    let headers = this.getHttpHeaders();
    return this.http.post(environment.watchlistEndpoint, article, { headers: headers }).pipe(
      catchError(this.handleError),
      map(this.pickApiResponse)
    );
  }

  //removes the particular article from the database
  deleteArticleFromWatchlist(id: number) {
    let headers = this.getHttpHeaders();
    return this.http.delete(`${environment.watchlistEndpoint}/${id}`, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred in the client side', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
