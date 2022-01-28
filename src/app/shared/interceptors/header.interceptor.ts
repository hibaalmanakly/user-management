import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HeaderInterceptor implements HttpInterceptor {

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    let headers = {};
    if (token) {
      headers = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
    }
    const authRequest = req.clone(headers);

    return next.handle(authRequest).pipe(
      catchError((error) => {
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {

          } else {
            switch (error.status) {
              case 401:
                // Unauthorized User (Invalid Token)
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login').then();
                handled = true;
                break;
              case 403:
                // Forbidden
                this.router.navigateByUrl('/login').then();
                handled = true;
                break;
            }
          }
        }

        if (handled) {
          return of(error);
        } else {
          return throwError(error);
        }
      }));
  }
}
