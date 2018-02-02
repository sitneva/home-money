import {Component, Input, OnInit} from '@angular/core';
import {HMEvent} from "../../shared/models/event.model";

@Component({
  selector: 'hm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories;
  @Input() events;

  constructor() {
  }

  ngOnInit() {
    this.setCatNates();
  }

  setCatNates() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getClassName(e: HMEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income',
    };
  }

}
