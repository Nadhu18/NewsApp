import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { of, Observable } from 'rxjs';
import { ThumbnailComponent } from './thumbnail.component';
import { NewsService } from '../../news.service';
import { Article } from '../../article';
import { NewsApiModel } from '../../newsApiModel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, NavigationEnd } from '@angular/router';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let newsServiceSpy: jasmine.SpyObj<NewsService>;
  let router: Router;
  let arti: Article = {
    author: "author",
    comments: "comments",
    content: "content",
    description: "description",
    id: 1,
    isWatchlisted: false,
    publishedAt: "22-11-2012",
    title: "title",
    url: "url",
    urlToImage: "urltoimage",
    userId: "user"
  };
  let arti2: Article = {
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

  class MockRouter {
    public ne = new NavigationEnd(0, null, null);
    public events = new Observable(observer => {
      observer.next(this.ne);
      observer.complete();
    });
    public routeReuseStrategy = {shouldReuseRoute: ()=> {return false;}};
  }
  
  beforeEach(async(() => {
    newsServiceSpy = jasmine.createSpyObj("NewsService", ["addArticleTowatchlist", "deleteArticleFromWatchlist"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      declarations: [ ThumbnailComponent ],
      providers: [{provide: NewsService, useValue: newsServiceSpy}, { provide: Router, useClass: MockRouter }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    newsServiceSpy = TestBed.get(NewsService);
    newsServiceSpy.addArticleTowatchlist.and.returnValue(of(arti));
    newsServiceSpy.deleteArticleFromWatchlist.and.returnValue(of(arti2));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the article to favorites', () => {
    component.article = arti;
    component.addArticleToWatchlist();
    expect(component.article).toEqual(arti2);
    expect(newsServiceSpy.addArticleTowatchlist.calls.count()).toBe(1);
  });

  it('should delete the article from favorites', () => {
    component.article = arti;
    component.removeArticleFromWatchlist();
    expect(component.article).toEqual(arti);
    expect(newsServiceSpy.deleteArticleFromWatchlist.calls.count()).toBe(1);
  });
});
