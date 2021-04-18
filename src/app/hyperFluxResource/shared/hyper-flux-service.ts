import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IField, IRelay } from './field.model';


@Injectable()

export class HyperFluxService {
  user = JSON.parse(localStorage.getItem('user'));
  email =  this.user.email;
  securityToken = this.user.securityToken;
  token = `${this.email}:${this.securityToken}`;

  constructor(private http: HttpClient){
  }


  deleteRelay(relayId) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.delete<IRelay>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${relayId}`,
    { headers: reqHeader, observe: 'response' })
    .pipe(catchError(this.handleError('deleteRelay')));
  }


  getField(id: number): Observable<IField> {

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.get<IField>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`, { headers: reqHeader })
    .pipe(catchError(this.handleError <IField>('getField')));
  }

  getFields(): Observable<IField[]> {

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.get<any[]>('http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields', { headers: reqHeader })
    .pipe(catchError(this.handleError <IField[]>('getFields')));
  }

  getRealys(id: number): Observable<IRelay[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.get<any[]>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}/relays`, { headers: reqHeader })
    .pipe(catchError(this.handleError <IRelay[]>('getRelays')));

  }

  saveField(id: number, fieldData: IField) {

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.put<IField>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`,
    fieldData, { headers: reqHeader })
      .pipe(catchError(this.handleError<IField>('saveField')));

  }

  saveRelay(id: number, relayData: IRelay) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + btoa(this.token)
   });

    return this.http.put<IRelay>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${id}`,
    relayData, { headers: reqHeader })
      .pipe(catchError(this.handleError<IRelay>('saveRelay')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}




