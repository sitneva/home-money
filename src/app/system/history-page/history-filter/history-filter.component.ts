import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'hm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  timePeriods = [
    {type: 'd', lable: 'День'},
    {type: 'w', lable: 'Неделя'},
    {type: 'M', lable: 'Месяц'},
    {type: 'Y', lable: 'Год'}
  ];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  types = [
    {type: 'income', lable: 'Доход'},
    {type: 'outcome', lable: 'Расход'}
  ]

  constructor() {
  }

  onCloseFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i.value !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
    /*if (checked) {
      this.selectedTypes.indexOf(value) !== -1 ? this.selectedTypes.push(value) : null;
    } else {
      this.selectedTypes = this.selectedTypes.filter(i => i.value !== value);
    }*/
  }

  handleChangeCategoty({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.onFilterApply.emit( {
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
