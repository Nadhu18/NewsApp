import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { CategorywiseComponent } from './categorywise.component';
import { NewsService } from '../../news.service';
import { NewsApiModel } from '../../newsApiModel';
import { Article } from '../../article';


describe('CategorywiseComponent', () => {
  let component: CategorywiseComponent;
  let fixture: ComponentFixture<CategorywiseComponent>;
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

    newsServiceSpy = jasmine.createSpyObj("NewsService", ["getCategoryWiseNews", "getWatchListedArticles"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CategorywiseComponent ],
      providers: [{provide: NewsService, useValue: newsServiceSpy}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseComponent);
    component = fixture.componentInstance;
    newsServiceSpy = TestBed.get(NewsService);
    newsServiceSpy.getCategoryWiseNews.and.returnValue(of(apiModel));
    newsServiceSpy.getWatchListedArticles.and.returnValue(of([arti]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return api model on nginit', () => {
    component.page = 0;
    component.pageSize = 5;
    component.selectedCategory = "General";
    component.ngOnInit();
    expect(component.model).toEqual(apiModel);
    expect(newsServiceSpy.getCategoryWiseNews.calls.count()).toBe(1);
    expect(newsServiceSpy.getWatchListedArticles.calls.count()).toBe(1);
  });

  it('should return the model on category change', () => {
    component.page = 0;
    component.pageSize = 5;
    component.onCategorySelect("Science");
    expect(component.model).toEqual(apiModel);
    expect(component.selectedCategory).toEqual("Science");
    expect(newsServiceSpy.getCategoryWiseNews.calls.count()).toBe(1);
    expect(newsServiceSpy.getWatchListedArticles.calls.count()).toBe(1);
  });
});
