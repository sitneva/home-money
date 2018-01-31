import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'hm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  @Output() OnCategoryAdd = new EventEmitter<Category>();
  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) {
  }


  onSubmit(form: NgForm) {
    const {name} = form.value;
    let {capasity} = form.value;
    if (capasity < 0) {
      capasity *= -1;
    }
    const category = new Category(name, capasity);
    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((categ) => {
        console.log(categ);
        form.reset();
        form.form.patchValue({capasity: 1});
        this.OnCategoryAdd.emit(categ);
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
