import { HasValidToken } from './has-valid-token.service';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
describe('HasValidToken', () => {
  let router;
  let service;
  const initTestModule = (initialState = {}) => {
    let routerMock = {
      navigate: jasmine.createSpy('navigate').and.resolveTo()
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        HasValidToken,
        { provide: Router, useValue: routerMock },
      ]
    });
    service = TestBed.inject(HasValidToken);
    router = TestBed.inject(Router);
  };
  beforeEach(() => {
    initTestModule();
  });
  it('should should exist', () => {
    expect(service).toBeTruthy();
  });
  it('should reroute to login page', () => {
    const twoHoursAgo = new Date();
    twoHoursAgo.setFullYear(twoHoursAgo.getHours() - 2);
    const expirationDate: number = new Date(twoHoursAgo).getTime();
    localStorage.setItem('user', JSON.stringify({securityTokenExpiration: expirationDate}));
    expect(service.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalled();
  });
  it('should return true', () => {
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
    const expirationDate: number = new Date(oneHourFromNow).getTime();
    localStorage.setItem('user', JSON.stringify({securityTokenExpiration: expirationDate}));
    expect(service.canActivate()).toEqual(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
