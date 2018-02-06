
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from '../models/user.model';
import {BaseApi} from '../../system/shared/core/base-api';

@Injectable()
export class UserService extends BaseApi{
  constructor(public http: Http) {
    super(http);
  }

 /* getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .map((response: Response) => response.json())
      .map ((user: User[]) => user[0] ? user[0] : undefined);
  }*/

  getUserByEmail(email: string): Observable<User> {
   return this.get(`users?email=${email}`)
     .map ((user: User[]) => user[0] ? user[0] : undefined);
  }

  createNewUser(user: User): Observable<User> {
    return this.post(`users`, user);
  }
}
