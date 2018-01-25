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
  subscription: Subscription;
  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest (
      this.billService.getBill(),
      this.billService.getCurrency('RUB')
    ).subscribe((data: [Bill, any]) => {
        console.log(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
