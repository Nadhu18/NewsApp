import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WatchlistComponent } from './watchlist.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from '../../news.service';
import { Article } from '../../article';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let newsServiceSpy: jasmine.SpyObj<NewsService>;
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

  beforeEach(async(() => {
    newsServiceSpy = jasmine.createSpyObj("NewsService", ["getWatchListedArticles"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ WatchlistComponent ],
      providers: [{provide: NewsService, useValue: newsServiceSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    newsServiceSpy = TestBed.get(NewsService);
    newsServiceSpy.getWatchListedArticles.and.returnValue(of([arti]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the favorites on nginit', () => {
    component.ngOnInit();
    expect(component.articles).toEqual([arti]);
    expect(newsServiceSpy.getWatchListedArticles.calls.count()).toBe(1);
  });
});
