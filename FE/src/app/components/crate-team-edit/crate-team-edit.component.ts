import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-crate-team-edit',
  templateUrl: './crate-team-edit.component.html',
  styleUrls: ['./crate-team-edit.component.scss'],
})
export class CrateTeamEditComponent {
  addForm = this.builder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    level: ['', [Validators.required]],
    age: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    statusTeam: [0, [Validators.required]],
    feildStake: ['', [Validators.required]],
  });
  useFieldId: any;
  user: any;
  feildStake: any = [];
  allTeam: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private teamService: TeamserviceService,
    private orderService: OrderService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getCategoryById(id!);
    });
    this.getAllTeamByUSer();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.handelGetFeidIdStake();
  }
  getCategoryById(id: string) {
    this.teamService.getIdTeam(id).subscribe((category) => {
      console.log(category, 'category');
      this.addForm.patchValue({
        name: category.data.name,
        description: category.data.description,
        phone: category.data.phone,
        age: category.data.age,
        level: category.data.level,
        statusTeam: category.data.status.toString(),
        feildStake: category.data.fieldId,
      });
    });
  }
  getAllTeamByUSer() {
    this.teamService.getMyTeam().subscribe((team) => {
      console.log(team, 'team');
      if (team.data) this.allTeam = team.data;
    });
  }
  handleSubmitEditCategoryForm() {
    if (this.addForm.invalid) return;
    const id = this.route.snapshot.paramMap.get('id');
    const category = {
      id: id,
      name: this.addForm.value.name || '',
      description: this.addForm.value.description || '',
      phone: this.addForm.value.phone || '',
      age: this.addForm.value.age || '',
      level: this.addForm.value.level || '',
      status: this.addForm.value.statusTeam as number,
      fieldId: this.useFieldId,
    };
    if (this.addForm.value.statusTeam == 1) {
      for (let i = 0; i < this.allTeam.length; i++) {
        console.log(this.allTeam[i]);
        if (this.allTeam[i].id == id) {
          continue;
        } else {
          const category = {
            id: this.allTeam[i].id,
            name: this.allTeam[i].name || '',
            description: this.allTeam[i].description || '',
            phone: this.allTeam[i].phone || '',
            age: this.allTeam[i].age || '',
            level: this.allTeam[i].level || '',
            fieldId: this.useFieldId,
            status: 0,
          };
          this.teamService.editTeamByUser(category).subscribe(() => {
            console.log('success');
          });
        }
      }
    }

    this.teamService.editTeamByUser(category).subscribe(() => {
      this.toastr.success('Update category successfully!');
      this.router.navigate(['/create-team']);
    });
  }

  // errr

  handelGetFeidIdStake() {
    this.orderService.getAllOrder().subscribe((order) => {
      console.log('success');
      console.log(order);
      this.feildStake = order.data.items.filter(
        (item: any) => item.deposited == true || item.paid == true
      );
    });
  }
  onServiceSelectionChange(event: any) {
    console.log(event, 'selection');
    this.useFieldId = event;
  }
  isItemSelected(itemId: string): boolean {
    return this.feildStake.some((item: any) => item.fieldId === itemId);
  }
}
