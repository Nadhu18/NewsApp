import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchlistComponent } from './searchlist.component';
import { NewsService } from '../../news.service';
import { Article } from '../../article';
import { NewsApiModel } from '../../newsApiModel';


describe('SearchlistComponent', () => {
  let component: SearchlistComponent;
  let fixture: ComponentFixture<SearchlistComponent>;
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
    newsServiceSpy = jasmine.createSpyObj("NewsService", ["getSearchedNews", "getWatchListedArticles"]);

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      declarations: [ SearchlistComponent ],
      providers: [{provide: NewsService, useValue: newsServiceSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchlistComponent);
    component = fixture.componentInstance;
    newsServiceSpy = TestBed.get(NewsService);
    newsServiceSpy.getSearchedNews.and.returnValue(of(apiModel));
    newsServiceSpy.getWatchListedArticles.and.returnValue(of([arti]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the search results on nginit', () => {
    component.page = 0;
    component.pageSize = 5;
    component.searchTerm = "apple";
    component.ngOnInit();
    expect(component.model).toEqual(apiModel);
  });
});
