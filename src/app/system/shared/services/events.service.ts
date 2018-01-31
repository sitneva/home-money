
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseApi} from '../core/base-api';
import {HMEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: HMEvent): Observable<HMEvent> {
    return this.post('events', event);
  }

}
