import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from './user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {

  let httpMock: HttpTestingController;
  let authService: AuthService;
  let registerURl = "http://localhost:8089/auth/register/";
  let loginURL = "http://localhost:8089/auth/login/";
  let tokenString = "token";
  let user: User = {
    firstName: "firstName",
    lastName: "lastName",
    password: "password",
    userId: "user"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return the token when logged in', () => {
    authService.login("user", "password").subscribe(obj => {
      expect(obj).toEqual(tokenString);
    });

    const mockReq = httpMock.expectOne(loginURL);
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(tokenString);
  });

  it('should thrown an error when logging in', () => {
    authService.login("user", "password").subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(loginURL);
    expect(mockReq.request.method).toEqual('POST');
  });


  it('should return the user when registered', () => {
    authService.register("user", "password", "firstName", "lastName").subscribe(u => {
      expect(u).toEqual(user);
    });

    const mockReq = httpMock.expectOne(registerURl);
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(user);
  });

  it('should thrown an error when registered', () => {
    authService.register("user", "password", "firstName", "lastName").subscribe({
      error(err) {
        expect(of(err)).toBeTruthy();
        expect(err).not.toBeNull();
        expect(err).not.toBeUndefined();
      }
    });

    const mockReq = httpMock.expectOne(registerURl);
    expect(mockReq.request.method).toEqual('POST');
  });

});
