import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {HMEvent} from '../shared/models/event.model';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {Subscription} from 'rxjs/Subscription';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'hm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  chartData = [];
  categories: Category[] = [];
  events: HMEvent[] = [];
  filteredEvents: HMEvent[] = [];

  isLoaded = false;
  isFilterVisible = false;
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService,
              private eventSercice: EventsService) {
  }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventSercice.getEvents()
    ).subscribe((data: [Category[], HMEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
        //console.log(this.chartData);
      }
    );
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents.filter(e => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        'name': cat.name,
        'value': catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean): void {
    this.isFilterVisible = dir;
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  onFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH.mm.ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
