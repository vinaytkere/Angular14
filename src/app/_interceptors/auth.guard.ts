import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../_service/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  constructor(private ac: AccountsService, private router: Router) { }
  canActivate() {
    this.ac.isLoggedIn$.subscribe(m => {
      this.isLoggedIn = m
    })
    if (this.isLoggedIn) {
      return true;
    }
    this.router.navigate(['./login']);
    return false;
  }



}
