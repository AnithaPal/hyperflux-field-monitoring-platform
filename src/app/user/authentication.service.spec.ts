import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [AuthenticationService]
      });

      authenticationService = TestBed.inject(AuthenticationService);
      httpMock = TestBed.get(HttpTestingController);
  });

  it('should have a service instance', () => {
      expect(authenticationService).toBeDefined();
  });

  it('should return userData when registerUser', (done) => {
    const userData = {
      team: {
        name: 'Test Team 11'
      },
      user: {
        displayName: 'Test',
        email: 'test@test1.co',
        password: 'password'
      }
    };
    const user = {
      displayName: 'Test',
      email: 'test@test1.co',
      password: '$2b$10$t0WmuXjSdiA7xydsCHJDqegRL/44UzBvf94A/MTMkm4x4PfTOCds2',
      role: 'OWNER',
      team: 101,
      securityToken: null,
      securityTokenExpiration: null,
      id: 29,
      createdAt: '2021-04-08T17:48:09.039Z',
      updatedAt: '2021-04-08T17:48:09.039Z'
    }
    authenticationService.registerUser(userData).subscribe(result => {
      expect(result.email).toBe('test@test1.co');
      done();
    });
    const req = httpMock.expectOne('http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/registration');
    expect(req.request.method).toEqual('POST');
    req.flush(user);
  });


  it('should return user with security token and expiration date when loginUser', (done) => {
    const loginData = {
      email: 'test@test1.co',
      password: 'password'
    };
    const user = {
      'id': 29,
      'displayName': 'Test',
      'email': 'test@test1.co',
      'role': 'OWNER',
      'password': null,
      'createdAt': '2021-04-08T17:48:09.039Z',
      'updatedAt': '2021-04-08T17:49:36.160Z',
      'team': 101,
      'securityToken': '0b9a2a8c9adfdb82549cf24098d5625c309e986ea50b8faa32aeb9fa25de2757',
      'securityTokenExpiration': new Date('2021-05-08T17:49:36.149Z')
    };
    authenticationService.loginUser(loginData).subscribe((result) => {
      expect(result.securityToken).toBe('0b9a2a8c9adfdb82549cf24098d5625c309e986ea50b8faa32aeb9fa25de2757');
      done();
    });
    const req = httpMock.expectOne('http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/authentication');
    expect(req.request.method).toEqual('POST');
    req.flush(user);
  });
});

