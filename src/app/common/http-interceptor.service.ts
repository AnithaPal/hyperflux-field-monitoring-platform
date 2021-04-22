import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HTTPInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user'));
    const email =  user.email;
    const securityToken = user.securityToken;
    const token = `${email}:${securityToken}`;
    const bearerToken = btoa(token);
    const errorMesage = '';
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + bearerToken
        }
      });
    }
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 403) {
          this.router.navigate(['login'], { state: { errorMessage: 'You are forbidden to do this action.' } });
        } else if ( err.status === 401) {
          this.router.navigate(['login'], { state: { errorMessage: 'You are not authorized to do this action.' } });
        } else if (err.status === 404) {
          this.router.navigate(['404']);
        } else{
          return;
        }
      }
    }));
  }
}

