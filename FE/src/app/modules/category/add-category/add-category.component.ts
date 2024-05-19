import { FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from './../../../services/category/category.service';
// import { IDocCategories } from 'src/app/interfaces/Category';
import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  addForm = this.builder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  categories!: ICategory[];
  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router, // private toastr: ToastrService
    private toastr: ToastrService
  ) {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      console.log(this.categories);
    });
  }
  /* handle Thêm mới category */
  handleAddNewCategory() {
    if (this.addForm.invalid) return;
    const category: any = {
      name: this.addForm.value.name || '',
      description: this.addForm.value.description || '',
    };
    /* compare name */
    // const isExist = this.categories.find((categoryItem) => {
    //   return categoryItem.name === category.name.trim();
    // });
    // if (isExist) {
    //   // this.toastr.warning('Tên danh mục đã tồn tại');
    //   this.addForm.reset();
    //   return;
    // }

    this.categoryService.addNewCategory(category).subscribe(() => {
      this.router.navigate(['/admin/manager-categories']);
      this.toastr.success('Add category successfully');
    });
  }
}
