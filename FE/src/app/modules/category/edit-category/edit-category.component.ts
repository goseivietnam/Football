import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from './../../../services/category/category.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent {
  editForm = this.builder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService // private toastr: ToastrService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getCategoryById(id!);
    });
  }
  handleSubmitEditCategoryForm() {
    if (this.editForm.invalid) return;
    const id = this.route.snapshot.paramMap.get('id');
    const category = {
      id: id,
      name: this.editForm.value.name || '',
      description: this.editForm.value.description || '',
    };
    this.categoryService.updateCategory(category).subscribe(() => {
      this.toastr.success('Update category successfully!');
      this.router.navigate(['/admin/manager-categories']);
    });
  }
  getCategoryById(id: string) {
    this.categoryService.getCategoryById(id).subscribe((category) => {
      this.editForm.patchValue({
        name: category.data.name,
        description: category.data.description,
      });
    });
  }
}
