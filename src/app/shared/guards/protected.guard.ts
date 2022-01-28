import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectedGuard implements CanLoad {

  constructor(public router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    if (!token) {
      this.router.navigateByUrl('/login').then();
    }
    return !!token;
  }
}
