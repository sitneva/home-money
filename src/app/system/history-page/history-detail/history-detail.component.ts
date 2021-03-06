import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {Subscription} from 'rxjs/Subscription';
import {Category} from '../../shared/models/category.model';
import {HMEvent} from '../../shared/models/event.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'hm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  categories: Category[] = [];
  events: HMEvent[] = [];
  isLoaded = false;
  paramId: number;
  currentEvent: HMEvent;
  className: string;
  catName: string;

  constructor( private route: ActivatedRoute,
               private eventService: EventsService,
               private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
      .mergeMap ((event: HMEvent) => {
        this.currentEvent = event;
        return this.categoriesService.getCategoryById(event.category);
    })
      .subscribe((category: Category) => {
        this.catName = category.name;
        this.isLoaded = true;
        this.getCurrentEventInfo();
      });


  }

  getCurrentEventInfo (): void {
    this.className = this.currentEvent.type === 'income' ? 'success' : 'danger';

    this.events.forEach((e) => {
      this.catName = this.categories.find(c => c.id === this.currentEvent.category).name;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
