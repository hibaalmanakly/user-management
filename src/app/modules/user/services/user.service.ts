import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {PaginationResult} from '../../../shared/models/pagination-result';
import {CreateUserRequest} from '../models/request/create-user-request';
import {User} from '../models/response/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Get list of users by page number.
   * @param pageNumber Default is 1
   */
  getAllUsers(pageNumber: number = 1): Observable<PaginationResult<User>> {
    return this.http.get<PaginationResult<User>>('http://restapi.adequateshop.com/api/users?page=' + pageNumber);
  }

  /**
   * Create new user
   * @param payload including name, email and location
   */
  createUser(payload: CreateUserRequest): Observable<User> {
    return this.http.post<User>('http://restapi.adequateshop.com/api/users', payload);
  }
}
