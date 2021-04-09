import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class HasValidToken implements CanActivate{
  constructor(private router: Router){

  }
   canActivate(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      const expirationDate = new Date(user.securityTokenExpiration).getTime();
      const now = new Date().getTime();

      if (now > expirationDate){
        this.router.navigate(['login']);
        return false;
      }
      else {
        return true;
      }
  }

}
