
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Category} from '../models/category.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }
  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }
  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

}
