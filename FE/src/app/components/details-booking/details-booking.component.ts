import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeServiceService } from 'src/app/services/feeService/fee-service.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { environment } from 'src/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-details-booking',
  templateUrl: './details-booking.component.html',
  styleUrls: ['./details-booking.component.scss'],
})
export class DetailsBookingComponent {
  dataDetails: any = {};
  checkUserOrAdmin: boolean = false;
  priceStake: number = 0;
  dataBooking: any;
  //Tổng tiền dịch vụ
  totalFeeServiceAmount: any = 0;
  //Tổng tiền còn thanh toán
  totalAmount: any = 0;
  urlImage: string = environment.API_URL + '/root/';
  fieldService: any = [];
  dataToExport: any;
  constructor(
    private orderService: OrderService,
    private params: ActivatedRoute,
    private feeService: FeeServiceService,
    private productService: ProductsService
  ) {
    this.dataBooking = JSON.parse(localStorage.getItem('booking') || '{}')

    this.params.queryParams.subscribe((params) => {
      const userId = params['user'];
      if (userId == 1) {
      } else {
        this.checkUserOrAdmin = false;
      }
    });
    this.handelGetDetailsBooking();

    

  }
  handelGetDetailsBooking() {
    var id = this.params.snapshot.params['id'];
    this.orderService.getDetailsBooking(id).subscribe((data: any) => {

      if (data.data.deposited == true) {
        this.checkUserOrAdmin = true;
      }

      this.priceStake = data.data.price / 10;
      this.dataDetails = data.data;
      this.dataToExport = {
        name: data.data.user.email,
        price: data.data.price,
        startDate: data.data.start,
        endDate: data.data.end,
        nameField: data.data.field.name,
      };

      if (!this.dataDetails.field) {
        this.dataDetails.field = {};
      }

      if (!this.dataDetails.user) {
        this.dataDetails.user = {};
      }

      if (!this.dataDetails.price) { this.dataDetails.price = 0; }

      if (!this.priceStake) { this.priceStake = 0; }

      this.totalFeeServiceAmount = 0;

      if (this.dataDetails.services && Array.isArray(this.dataDetails.services)) {
        this.dataDetails.services.forEach((item: any) => {
          this.totalFeeServiceAmount += (item.price ?? 0) * (item.quantity ?? 1);
        });
      }

      this.totalAmount = this.totalFeeServiceAmount + this.dataDetails.price - this.priceStake;
    });

    this.productService.getByFieldId(id).subscribe((data: any) => {
      this.fieldService = data.data.items
      console.log(this.fieldService);
    })
    
    console.log(this.dataBooking, 'dataBooking')
  }

  exportToExcel(): void {
    const excelData: any[] = [];
    Array(this.dataBooking).forEach((booking: any) => {
      const services = booking.services.map((service: any) => service.serviceName).join('\n');
      const row = {
        fieldId: booking.fieldId,
        start: booking.start,
        end: booking.end,
        status: booking.status,
        description: booking.description,
        services: services,
      };
      excelData.push(row);
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, `hoadon.xlsx`);
  }

  onServiceSelectionChange(selectedService: any) {
    const quantity = prompt('Nhập số lượng cho dịch vụ', '0');
    if (quantity !== null && Number(quantity) > 1) {
      const quantityInt = parseInt(quantity);
      if (!isNaN(quantityInt)) {
        var feeService = {
          ServiceFeeId: selectedService.id,
          serviceName: selectedService.serviceName,
          Quantity: quantityInt,
          Price: selectedService.price,
          FieldId: selectedService.FieldId,
          BookingId: selectedService.bookingId
        };

        console.log(feeService);
        this.productService.createServiceField(feeService).subscribe((data: any) => {
          if(data.success){
          window.location.reload();
          } else {
            alert('Dịch vụ đã tồn tại');
          }
        })
       
      } else {
        alert('Vui lòng nhập số hợp lệ.');
      }
    }else{
      alert('Vui lòng nhập số hợp lệ.');
    }
  }
}
