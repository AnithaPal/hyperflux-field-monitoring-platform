import { RegistrationComponent } from './registration.component';
import { AuthenticationService } from '../authentication.service';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { IUser} from '../user.model';
// import { ITeam } from '../user.model';

fdescribe('RegistarionComponent', () => {
  let fixture;
  let component: RegistrationComponent;;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    class MockSetupConfigService {
      registerUser(userData) {
        return of({});
      }
    }

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
  });

  describe('registerUser', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should create service', () => {
      expect(authService).toBeTruthy();
    });

    it('should register user and redirect to login page', () => {
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

      spyOn(authService, 'registerUser').and.returnValue(of(user));

      spyOn(router, 'navigate').and.resolveTo();
      component.registerUser(user);

      expect(authService.registerUser).toHaveBeenCalledWith(user);
      expect(router.navigate).toHaveBeenCalledWith( ['login'], { state: { message: 'Your Registration is successful. Login here...' } });
    });
  });

//   it('should not have the display error message', () => {
//     const errorMessageEl = fixture.debugElement.query(By.css('.error-message'));
//        expect(errorMessageEl).toBeNull();
//  });

  it('should set and display errorMessage when registering with existing team name', () => {
    const user = {
      team: {
              name: 'Team 6'
            },
      user: {
        displayName: 'abcd',
        email: 'an@an.com',
        password: 'string12334'
      }
    };

    const error = { error:
      { message: 'Team name already in use'}
    };

    spyOn(authService, 'registerUser').and.returnValue(of(new HttpErrorResponse(error)));
    spyOn(router, 'navigate').and.resolveTo();
    component.registerUser(user);
    expect(component.errorMessage).toBe('Team name already in use');
    expect(router.navigate).not.toHaveBeenCalled( );


  });

  it('should set errorMessage when registering with existing email address', () => {

  });
});
