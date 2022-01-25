import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {CreateUserRequest} from 'src/app/modules/auth/models/create-user-request';
import {ResponseResult} from 'src/app/shared/models/response-result';
import {User} from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registerNewUser(payload: CreateUserRequest): Observable<ResponseResult<User>> {
    return this.http.post<ResponseResult<User>>('http://restapi.adequateshop.com/api/authaccount/registration', payload)
  }
}
