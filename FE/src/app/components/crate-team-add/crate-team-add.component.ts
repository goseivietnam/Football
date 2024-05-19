import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-crate-team-add',
  templateUrl: './crate-team-add.component.html',
  styleUrls: ['./crate-team-add.component.scss']
})
export class CrateTeamAddComponent {
  addForm = this.builder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    level: ['', [Validators.required]],
    age: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  constructor( private builder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router, // private toastr: ToastrService
    private teamService : TeamserviceService,
    private toastr: ToastrService){

  }
  createTeamByUser() {
    if (this.addForm.invalid) return;
    const category: any = {
      name: this.addForm.value.name || '',
      description: this.addForm.value.description || '',
      level: this.addForm.value.level || '',
      age: this.addForm.value.age || '',
      phone: this.addForm.value.phone || '',

    };
    this.teamService.createTeamByUser(category).subscribe(() => {
      this.router.navigate(['/create-team']);
      this.toastr.success('Add team successfully');
    });
  }
}
