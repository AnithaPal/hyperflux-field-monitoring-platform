import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()

export class AuthenticationService {
  constructor(private http: HttpClient){

  }

  registerUser(userData){
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<any>('http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/registration', userData, options);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable <T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
