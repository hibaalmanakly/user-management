import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ResponseResult} from '../../../shared/models/response-result';
import {RegisterUserRequest} from '../models/request/register-user-request';
import {loginUserRequest} from '../models/request/login-user-request';
import {User} from '../models/response/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  /**
   * Register new user
   * @param payload including name, email and password
   */
  registerNewUser(payload: RegisterUserRequest): Observable<ResponseResult<User>> {
    return this.http.post<ResponseResult<User>>('http://restapi.adequateshop.com/api/authaccount/registration', payload);
  }

  /**
   * Login user
   * @param payload including email and password
   */
  login(payload: loginUserRequest): Observable<ResponseResult<User>> {
    return this.http.post<ResponseResult<User>>('http://restapi.adequateshop.com/api/authaccount/login', payload);
  }
}
