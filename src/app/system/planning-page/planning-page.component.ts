import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";
import {HMEvent} from "../shared/models/event.model";
import {Subscription} from "rxjs/Subscription";
import {combineLatest} from "rxjs/observable/combineLatest";

@Component({
  selector: 'hm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})


export class PlanningPageComponent implements OnInit, OnDestroy {
  bill: Bill;
  categories: Category[] = [];
  events: HMEvent[] = [];
  sub1: Subscription;
  isLoaded = false;

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventService: EventsService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    )
      .subscribe((data: [Bill, Category[], HMEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
      });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getPersentage(cat: Category): number {
    const percent = (this.getCategoryCost(cat) / cat.capacity) * 100;
    return (percent > 100) ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPersentage(cat) + '%';
  }

  getCatClassColor(cat: Category): string {
    const percent = this.getPersentage(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
