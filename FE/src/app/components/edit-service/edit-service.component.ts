import { ServicesService } from 'src/app/services/service/services.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent {
  editForm = this.builder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    icon: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService, // private toastr: ToastrService
    private ServicesService: ServicesService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getCategoryById(id!);
    });
  }
  handleSubmitEditCategoryForm() {
    const id = this.route.snapshot.paramMap.get('id');
    const category = {
      id: id,
      name: this.editForm.value.name || '',
      description: this.editForm.value.description || '',
      icon: this.editForm.value.icon || '',
    };
    this.ServicesService.editSevice(category).subscribe(() => {
      this.toastr.success('Update category successfully!');
      this.router.navigate(['/admin/all-service']);
    });
  }
  getCategoryById(id: string) {
    this.ServicesService.getIdService(id).subscribe((category) => {
      this.editForm.patchValue({
        name: category.data.name,
        description: category.data.description,
        icon: category.data.icon,
      });
    });
  }
}
