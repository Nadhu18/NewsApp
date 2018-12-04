import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './modules/news/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let authService: AuthService;

  beforeEach(async(() => {
    router = jasmine.createSpyObj("router", ["navigate"]);
    authService = jasmine.createSpyObj("AuthService", ["deleteToken"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: Router, useValue: router }, { provide: AuthService, useValue: authService }]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent)
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should search the movie based on the input', () => {
    component.searchTerm = "apple";
    component.searchNews();
    expect(router.navigate).toHaveBeenCalledWith(['/news/search', 'apple']);
  });

  it('should logout the user when called', () => {
    component.logOut();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
