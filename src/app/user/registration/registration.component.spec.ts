import { RegistrationComponent } from './registration.component';
import { AuthenticationService } from '../authentication.service';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
describe('RegistrationComponent', () => {
  let fixture;
  let component: RegistrationComponent;;
  let authService: AuthenticationService;
  let router: Router;
  class MockSetupConfigService {
    registerUser(userData) {
      return of({});
    }
  }
  const user ={
    team: {
      name: 'Team 6'
    },
    user: {
      displayName: 'abcd',
      email: 'an@an.com',
      password: 'string12334'
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockSetupConfigService }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
    authService = TestBed.inject(AuthenticationService);
    router =  TestBed.inject(Router);
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(router, 'navigate').and.resolveTo();
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  describe('registerUser', () => {
    it('should register user and redirect to login page', () => {
      spyOn(authService, 'registerUser').and.returnValue(of(user));
      component.registerUser(user);
      expect(authService.registerUser).toHaveBeenCalledWith(user);
      expect(router.navigate).toHaveBeenCalledWith( ['login'], { state: { message: 'Your Registration is successful. Login here...' } });
    });

    it('should set and display errorMessage when registering with existing team name', () => {
      const error = { error:
        { message: 'Team name already in use'}
      };
      spyOn(authService, 'registerUser').and.returnValue(throwError(error));
      component.registerUser(user);
      expect(component.errorMessage).toBe('Team name already in use');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
