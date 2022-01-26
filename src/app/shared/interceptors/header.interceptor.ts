import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('user') ? localStorage.getItem('user') : '';
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    });
    return next.handle(authReq);
  }
}
