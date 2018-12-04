import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { NewsService } from './news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from './article';
import { NewsApiModel } from './newsApiModel';
import { environment } from '../../../environments/environment';

describe('NewsService', () => {
  let searchEndpoint = `${environment.searchEndpoint}/apple/1/5`;
  let topnewsEndpoint = `${environment.topnewsEndpoint}/1/5`;
  let categoryEndpoint = `${environment.categoryEndpoint}/science/1/5`;

  let arti: Article = {
    author: "author",
    comments: "comments",
    content: "content",
    description: "description",
    id: 1,
    isWatchlisted: true,
    publishedAt: "22-11-2012",
    title: "title",
    url: "url",
    urlToImage: "urltoimage",
    userId: "user"
  };
  let apiModel: NewsApiModel = {
    articles: [arti],
    totalResults: 1
  };

  let httpMock: HttpTestingController;
  let newsService: NewsService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });

    httpMock = TestBed.get(HttpTestingController);
    newsService = TestBed.get(NewsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('should return the search relared articles', () => {
    newsService.getSearchedNews('apple').subscribe(m => {
      expect(m).toEqual(apiModel);
    });
    const mockReq = httpMock.expectOne(searchEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(apiModel);
  });

  it('should thrown an error for getSearchedNews method', () => {
    newsService.getSearchedNews("apple").subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(searchEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return the articles from gettopnews method', () => {
    newsService.getTopNews().subscribe(m => {
      expect(m).toEqual(apiModel);
    });
    const mockReq = httpMock.expectOne(topnewsEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(apiModel);
  });

  it('should thrown an error for gettopnews method', () => {
    newsService.getTopNews().subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(topnewsEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return the articles from getCategorynews method', () => {
    newsService.getCategoryWiseNews('science').subscribe(m => {
      expect(m).toEqual(apiModel);
    });
    const mockReq = httpMock.expectOne(categoryEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(apiModel);
  });

  it('should thrown an error for getCategorynews method', () => {
    newsService.getCategoryWiseNews('science').subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(categoryEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should return watchlist articles', () => {
    newsService.getWatchListedArticles().subscribe(m => {
      expect(m).toEqual([arti]);
    });
    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush([arti]);
  });

  it('should throw error from getWatchListedArticles method', () => {
    newsService.getWatchListedArticles().subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should delete article from watchlist', () => {
    newsService.deleteArticleFromWatchlist(1).subscribe(m => {
      expect(m).toEqual(arti);
    });
    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/1`);
    expect(mockReq.request.method).toEqual('DELETE');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(arti);
  });

  it('should throw error from deleteArticleFromWatchlist', () => {
    newsService.deleteArticleFromWatchlist(1).subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(`${environment.watchlistEndpoint}/1`);
    expect(mockReq.request.method).toEqual('DELETE');    
  });

  
  it('should add article to watchlist', () => {
    newsService.addArticleTowatchlist(arti).subscribe(m => {
      expect(m).toEqual(arti);
    });
    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(arti);
  });

  it('should throw error from addMovieToWatchlist', () => {
    newsService.addArticleTowatchlist(arti).subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });
    const mockReq = httpMock.expectOne(environment.watchlistEndpoint);
    expect(mockReq.request.method).toEqual('POST');    
  });


});
