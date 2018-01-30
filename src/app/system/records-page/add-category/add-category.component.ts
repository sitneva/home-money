import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';


@Component({
  selector: 'hm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() OnCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }


  onSubmit(form: NgForm) {
    const {cname} = form.value;
    let {capasity} = form.value;
    if (capasity < 0 ) {
       capasity *= -1;
    }
    const category = new Category(cname, capasity);
    this.categoriesService.addCategory(category)
      .subscribe((categ) => {
        console.log(categ);
        form.reset();
        form.form.patchValue({capasity: 1});
        this.OnCategoryAdd.emit(categ);
      });
  }

}
