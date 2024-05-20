import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FeeServiceService } from 'src/app/services/feeService/fee-service.service';

@Component({
  selector: 'app-create-fee-service',
  templateUrl: './create-fee-service.component.html',
  styleUrls: ['./create-fee-service.component.scss']
})
export class CreateFeeServiceComponent {

  bookingId: any = 0;

  items: any = [];

  feeServiceId: any;

  quantity: any;

  addForm = this.builder.group({
    feeServiceId: ['', [Validators.required]],
    quantity: ['', [Validators.required]]
  });

  constructor( private builder: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router, 
    private feeService : FeeServiceService,
    private toastr: ToastrService) {

      this.route.paramMap.subscribe((params) => {
        this.bookingId = params.get('id');

      });
  }

  createFeeService() {
    if (this.addForm.invalid) return;

    const feeService: any = {
      feeServiceId: this.addForm.value.feeServiceId || '',
      quantity: this.addForm.value.quantity || '',
      bookingId: this.bookingId,
    };

    this.feeService.createFeeService(feeService).subscribe(() => {
      this.router.navigate(['/details-book/' + this.bookingId]);
      this.toastr.success('Add fee service successfully');
    });
  }
}
