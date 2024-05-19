import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { ServicesService } from 'src/app/services/service/services.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-service-fee',
  templateUrl: './service-fee.component.html',
  styleUrls: ['./service-fee.component.scss'],
})
export class ServiceFeeComponent {
  addForm = this.builder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    level: [''],

  });
  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router, // private toastr: ToastrService
    private teamService: TeamserviceService,
    private toastr: ToastrService,
    private ServicesService : ServicesService
  ) {}
  createTeamByUser() {
    if (this.addForm.invalid) return;
    const category: any = {
      name: this.addForm.value.name || '',
      description: this.addForm.value.description || '',
      icon: this.addForm.value.level || '2222',
    };
    this.ServicesService.createService(category).subscribe(() => {
      this.router.navigate(['/admin/all-service']);
      this.toastr.success('Add team successfully');
    });
  }
}
