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
    this.currency.filter((i) => {
      const t = Object.assign({}, i);
      console.log(t['ccy']);
      if (t['ccy'] === 'USD') {
        this.dollar = t['buy'];
      }
      if (t['ccy'] === 'EUR') {
        this.euro = t['buy'];
      }
    });
  }

}
