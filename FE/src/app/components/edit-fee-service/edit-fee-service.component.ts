import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { FeeServiceService } from 'src/app/services/feeService/fee-service.service';

@Component({
  selector: 'app-edit-fee-service',
  templateUrl: './edit-fee-service.component.html',
  styleUrls: ['./edit-fee-service.component.scss']
})
export class EditFeeServiceComponent {
  addForm = this.builder.group({
    quantity: ['', [Validators.required]]
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
    private feeService: FeeServiceService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      //this.getFeeServiceById(id!);
    });
  }
  
}
