import { HasValidToken } from './hasValidToken.service';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('HasValidToken', () => {
  const initTestModule = (initialState = {}) => {
    let routerMock;
    let service;
    routerMock = {
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
  };

  describe('initialization', () => {
    beforeEach(() => {
      initTestModule();
    });
    it('should should exist', () => {
      const service = TestBed.inject(HasValidToken);
      expect(service).toBeTruthy();
    });
  });



  // it('should reroute to login page, () => {
  // const now: number = new Date().getTime();
  // const milliseconds = now - (5 * 60 * 1000);
  // const expirtionDate: number = new Date(milliseconds).getTime();
  // });

  // it('should return true', ()=> {
  //   expect(service).toBeTruthy();
  // })

})



