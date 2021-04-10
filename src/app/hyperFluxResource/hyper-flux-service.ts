import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IField } from './field.model';


@Injectable()

export class HyperFluxService {
  user = JSON.parse(localStorage.getItem('user'));
  email =  this.user.email;
  securityToken = this.user.securityToken;
  token = `${this.email}:${this.securityToken}`;

  constructor(private http: HttpClient){
  }
  getFields(): Observable<IField[]> {



    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + btoa(this.token)
   });

    return this.http.get<any[]>('http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields', { headers: reqHeader })
    .pipe(catchError(this.handleError <IField[]>('getFields')));
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}




