import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

import {Bill} from '../shared/models/bill.model';
import {BillService} from '../shared/services/bill.service';


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

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest (
      this.billService.getBill(),
      this.billService.getCurrency('RUB')
    ).subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
        //console.log(this.currency);
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency(this.currency.base)
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
