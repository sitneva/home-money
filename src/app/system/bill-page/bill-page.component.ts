import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

import {Bill} from '../shared/models/bill.model';
import {BillService} from '../shared/services/bill.service';
import * as moment from 'moment';


@Component({
  selector: 'hm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;
  date: Date = new Date();

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    const momentDate = moment(this.date, 'DD.MM.YYYY HH.mm').format('DD.MM.YYYY');

    this.sub1 = Observable.combineLatest (
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
        //console.log(this.currency);
    });
  }

  onRefresh() {
    const momentDate = moment(this.date, 'DD.MM.YYYY HH.mm').format('DD.MM.YYYY');

    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
        .subscribe((currency: any) => {
          this.currency = currency;
          this.isLoaded = true;
    });
  }

  ngOnDestroy() {
     this.sub1.unsubscribe();
     if (this.sub2) {
       this.sub2.unsubscribe();
     }
  }

}
