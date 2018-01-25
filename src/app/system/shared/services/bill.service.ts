import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

import {Bill} from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: Http) {}

  getBill(): Observable<Bill> {
    return this.http.get('http://localhost:3000/bill')
      .map((response: Response) => response.json());
  }

  getCurrency(base: string = 'USD'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`)
      .map((response: Response) => response.json());
  }
}
