import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopnewsComponent } from './topnews.component';
import { NewsService } from '../../news.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Article } from '../../article';
import { NewsApiModel } from '../../newsApiModel';
import { of } from 'rxjs';

describe('TopnewsComponent', () => {
  let component: TopnewsComponent;
  let fixture: ComponentFixture<TopnewsComponent>;
  let newsServiceSpy: jasmine.SpyObj<NewsService>;
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

  beforeEach(async(() => {
    newsServiceSpy = jasmine.createSpyObj("NewsService", ["getTopNews", "getWatchListedArticles"]);

    TestBed.configureTestingModule({
      declarations: [ TopnewsComponent ],
      providers: [{provide: NewsService, useValue: newsServiceSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnewsComponent);
    component = fixture.componentInstance;
    newsServiceSpy = TestBed.get(NewsService);
    newsServiceSpy.getTopNews.and.returnValue(of(apiModel));
    newsServiceSpy.getWatchListedArticles.and.returnValue(of([arti]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the top news on nginit', () => {
    component.page = 0;
    component.pageSize = 5;
    component.ngOnInit();
    expect(component.model).toEqual(apiModel);
    expect(newsServiceSpy.getTopNews.calls.count()).toBe(1);
    expect(newsServiceSpy.getWatchListedArticles.calls.count()).toBe(1);
  });
});
