import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mandotory = "*All fields are mandotory";
  let pwdNoMatch = "*Password doest not match";
  let tokenString = "token";
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;
  let user: User = {
    firstName: "firstName",
    lastName: "lastName",
    password: "password",
    userId: "user"
  };

  beforeEach(async(() => {

    authServiceSpy = jasmine.createSpyObj("AuthService", ["login", "setToken", "setUserId", "register"]);
    router = jasmine.createSpyObj("router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [{ provide: Router, useValue: router }, { provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.get(AuthService);
    authServiceSpy.login.and.returnValue(of(tokenString));
    authServiceSpy.register.and.returnValue(of(user));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return login mandotory error', () => {
    component.login();
    expect(component.invalidCred).toEqual(mandotory);
  });

  it('should return register mandotory error', () => {
    component.register();
    expect(component.invalidReg).toEqual(mandotory);
  });

  it('should return register password error', () => {
    component.rUserid = "user";
    component.rFirstName = "firstname";
    component.rLastName = "lastname";
    component.rPassword = "password";
    component.rConfirmPassword = "confirm"
    component.register();
    expect(component.invalidReg).toEqual(pwdNoMatch);
  });

  it('should login the user', () => {
    component.userid = "user";
    component.password = "password";
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/news']);
    expect(authServiceSpy.login.calls.count()).toBe(1);
    expect(authServiceSpy.setToken.calls.count()).toBe(1);
    expect(authServiceSpy.setUserId.calls.count()).toBe(1);
  });

  it('should register the user', () => {
    component.rUserid = "user";
    component.rFirstName = "firstname";
    component.rLastName = "lastname";
    component.rPassword = "password";
    component.rConfirmPassword = "password";
    component.invalidReg = "error";
    component.register();
    expect(component.invalidReg).toEqual("");
  });

});
