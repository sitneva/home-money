import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

import {Bill} from '../models/bill.model';
import {BaseApi} from '../core/base-api';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any> {

    return this.http.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .map((response: Response) => response.json());
  }

  /*getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`)
    //return this.http.get(`https://api.privatbank.ua/p24api/exchange_rates?`})
      .map((response: Response) => response.json());
  }*/

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
