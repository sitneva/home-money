import {Component, Input, OnInit} from '@angular/core';

import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'hm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;
  date: Date = new Date();

  constructor() {
  }

  ngOnInit() {
    this.currency.forEach((i) => {
      if (i['ccy'] === 'USD') {
        this.dollar = this.bill.value / i['buy'];
      }
      if (i['ccy'] === 'EUR') {
        this.euro = this.bill.value / i['buy'];
      }
    });
  }

}
