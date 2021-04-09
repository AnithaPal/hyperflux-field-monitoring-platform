import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
    let serviceToTest: AuthenticationService;

    beforeEach(() => {
       TestBed.configureTestingModule({
           imports: [HttpClientTestingModule],
           providers: [AuthenticationService]
       });
       // inject the service using the TestBed
       serviceToTest = TestBed.inject(AuthenticationService);
    });

    it('should have a service instance', () => {
       expect(serviceToTest).toBeDefined();
    });

    // it('registerUser', () => {

    // })

    it('should return the mocked data in the subscribe', () => {
      const userData = {
        "team": {
          "name": "Test Team 11"
        },
        "user": {
          "displayName": "Test",
          "email": "test@test1.co",
          "password": "password"
        }
      };
      const user = {
        "displayName": "Test",
        "email": "test@test1.co",
        "password": "$2b$10$t0WmuXjSdiA7xydsCHJDqegRL/44UzBvf94A/MTMkm4x4PfTOCds2",
        "role": "OWNER",
        "team": 101,
        "securityToken": null,
        "securityTokenExpiration": null,
        "id": 29,
        "createdAt": "2021-04-08T17:48:09.039Z",
        "updatedAt": "2021-04-08T17:48:09.039Z"
      }
      const spy = spyOn(serviceToTest,'registerUser').and.returnValue(
          of(user)
      );

      serviceToTest.registerUser(userData).subscribe(result => {
      expect(result.email).toBe('test@test1.co');
     });
      expect(spy).toHaveBeenCalled();
 });

 it('loginUser', () => {

  // it('should return user with security token and expiration date'), ()=>{
  //   const loginData = {
  //     "email": "test@test1.co",
  //     "password": "password"
  //   }

  //   const user = {
  //     "id": 29,
  //     "displayName": "Test",
  //     "email": "test@test1.co",
  //     "role": "OWNER",
  //     "password": null,
  //     "createdAt": "2021-04-08T17:48:09.039Z",
  //     "updatedAt": "2021-04-08T17:49:36.160Z",
  //     "team": 101,
  //     "securityToken": "0b9a2a8c9adfdb82549cf24098d5625c309e986ea50b8faa32aeb9fa25de2757",
  //     "securityTokenExpiration": new Date("2021-05-08T17:49:36.149Z")
  //   }

  //   const spy = spyOn(serviceToTest,'loginUser').and.returnValue(
  //     of(user)
  //   );

  //   serviceToTest.loginUser(loginData).subscribe(result => {
  //     expect(result.securityToken).toBe('0b9a2a8c9adfdb82549cf24098d5625c309e986ea50b8faa32aeb9fa25de2757');
  //    });
  // }

 })
});
