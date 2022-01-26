import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {PaginationResult} from '../../../shared/models/pagination-result';
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
   * @param token Token
   */
  getAllUsers(pageNumber: number = 1, token: any): Observable<PaginationResult<User>> {
    return this.http.get<PaginationResult<User>>('http://restapi.adequateshop.com/api/users?page=' + pageNumber,
      {headers: {'Authorization': 'Bearer ' + token}});
  }
}
