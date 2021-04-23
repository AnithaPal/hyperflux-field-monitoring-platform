import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IField, IRelay } from './field.model';
import { IUser, ITeam } from '../../user/user.model';


@Injectable()

export class HyperFluxService {
  user = JSON.parse(localStorage.getItem('user'));
  email =  this.user.email;
  securityToken = this.user.securityToken;
  token = `${this.email}:${this.securityToken}`;
  bearerToken = btoa(this.token);

  constructor(private http: HttpClient){
  }

  deleteRelay(relayId: number): Observable<unknown>{
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.delete<IRelay>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${relayId}`,
    { headers: reqHeader, observe: 'response' })
    .pipe(catchError(this.handleError('deleteRelay')));
  }


  deleteUser(userId: number): Observable<unknown>{
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.delete<IUser>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/users/${userId}`,
    { headers: reqHeader, observe: 'response' })
    .pipe(catchError(this.handleError('deleteUser')));

  }

  getField(id: number): Observable<IField> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.get<IField>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`, { headers: reqHeader })
    .pipe(catchError(this.handleError <IField>('getField')));
  }

  getFields(): Observable<IField[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.get<any[]>('http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields', { headers: reqHeader })
    .pipe(catchError(this.handleError <IField[]>('getFields', [])));
  }

  getRelays(id: number): Observable<IRelay[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.get<any[]>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}/relays`, { headers: reqHeader })
    .pipe(catchError(this.handleError <IRelay[]>('getRelays', [])));

  }

  getTeam(id: number): Observable<ITeam>  {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.get<ITeam>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/teams/${id}`, { headers: reqHeader })
    .pipe(catchError(this.handleError <ITeam>('getTeam')));

  }

  getUsers(teamId: number): Observable<IUser[]>{
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.get<IUser[]>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/teams/${teamId}/users`, { headers: reqHeader })
   .pipe(catchError(this.handleError <IUser[]>('getUsers')));

  }

  saveField(id: number, fieldData: any): Observable<IField> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.put<IField>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`,
    fieldData, { headers: reqHeader })
      .pipe(catchError(this.handleError<IField>('saveField')));
  }

  saveRelay(id: number, relayData: any): Observable<IRelay> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.put<IRelay>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${id}`,
    relayData, { headers: reqHeader })
      .pipe(catchError(this.handleError<IRelay>('saveRelay')));
  }

  saveUser(id: number, userData: any): Observable<IUser> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.bearerToken
   });

    return this.http.put<IUser>(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/users/${id}`,
    userData, { headers: reqHeader })
      .pipe(catchError(this.handleError<IUser>('saveUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}




