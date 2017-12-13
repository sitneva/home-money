
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from './models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .map((response: Response) => response.json())
      .map ((user: User[]) => user[0] ? user[0] : undefined);
  }
}
