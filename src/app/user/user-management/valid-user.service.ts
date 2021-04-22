import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ValidUser implements CanActivate{
  constructor(private router: Router){

  }
   canActivate(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role !==  'OWNER'){
        this.router.navigate(['login']);
        return false;
      }
      else {
        return true;
      }
  }

}
