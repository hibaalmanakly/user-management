import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {CreateUserRequest} from '../models/create-user-request';
import {loginUserRequest} from '../models/login-user-request';
import {ResponseResult} from 'src/app/shared/models/response-result';
import {User} from 'src/app/shared/models/user';


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
  registerNewUser(payload: CreateUserRequest): Observable<ResponseResult<User>> {
    return this.http.post<ResponseResult<User>>('http://restapi.adequateshop.com/api/authaccount/registration', payload)
  }
}
