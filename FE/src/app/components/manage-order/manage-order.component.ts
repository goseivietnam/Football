import { Component } from '@angular/core';
import { IOrder } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';
import { formatCurrency } from 'src/app/utils/format-currency';
import { handleFomatDate } from 'src/app/utils/fomatDate';
import { environment } from 'src/environment';
import axios from 'axios';
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent {
  title: string = 'Quản lý đơn hàng';
  apiUrl = environment.API_URL;
  displayedColumns: string[] = [
    'STT',
    'items',
    'inforOrderShipping',
    'status',
    'total',
    'createdAt',
  ];
  dataSourcePending: IOrder[] = [];
  dataSourceDone: IOrder[] = [];
  dataSourceCancel: IOrder[] = [];
  accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
  user: any;
  theadTable: string[] = ['STT', 'Tên sản phẩm', 'Số lương', 'Trạng thái'];
  orders: any = [];
  orderDones: IOrder[] = [];
  orderCancel: IOrder[] = [];
  orderPending: IOrder[] = [];
  confirmData: IOrder[] = [];
  stakeMoneyData: IOrder[] = [];

  constructor(
    private userService: UserService,
    private orderServer: OrderService,
    private toastr: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getAllOrder();
  }

  /* get All users */
  getAllOrder() {
    this.orderServer.getAllOwnerAdmin(this.user.id).subscribe((order) => {
      console.log(order);
      this.orders = order.data.items;
      this.orderCancel = order.data.items.filter(
        (orderA: any) => orderA.status === 'Cancel'
      );
      this.orderDones = order.data.items.filter(
        (orderA: any) => orderA.status === 'Pair'
      );
      this.orderPending = order.data.items.filter(
        (orderA: any) => orderA.status === 'Wait' && orderA.deposited == false
      );
      this.confirmData = order.data.items.filter(
        (orderA: any) =>
          orderA.status === 'Confirm' && orderA.deposited == false
      );
      this.stakeMoneyData = order.data.items.filter(
        (orderA: any) =>
          orderA.deposited == true &&
          orderA.status === 'Confirm' &&
          orderA.status !== 'Cancel' &&
          orderA.status !== 'Pair'
      );
      this.dataSourcePending = this.orderPending;
      this.dataSourceDone = this.orderDones;
      this.dataSourceCancel = this.orderCancel;
    });
    console.log(this.orderCancel, 'orderCancel');
  }

  /* format currentcy */
  formatCurrency(value: number) {
    return formatCurrency(value);
  }

  /* format date */
  formatDate(date: string) {
    return handleFomatDate(date);
  }

  /* handle change status */
  handleChangeStatus(id: string, status: string) {
    this.orderServer.updateOrder(id, status).subscribe((data) => {
      console.log(
        '🚀 ~ ManageOrderComponent ~ this.orderServer.updateOrder ~ data:',
        data
      );
      this.toastr.success('Cập nhật trạng thái đơn hàng thành công');
      this.getAllOrder();
    });
  }

  /* handle confirm order done */
  async handleConfirmOrderDone(id: string) {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    const data: any = {
      id: id,
      status: 'Confirm',
    };
    this.orderServer.updateStatusOrder(data).subscribe((data: any) => {
      this.orderServer.acceptStakeService(id).subscribe((db: any) => {});
      this.getAllOrder();
      this.toastr.success('updated status');
    });
  }

  /* handle confirm order cancel */
  handleConfirmOrderCancel(id: string) {
    const data = {
      id: id,
      status: 'Cancel',
    };
    this.orderServer.updateStatusOrder(data).subscribe((data: any) => {
      this.getAllOrder();
      this.toastr.success('updated status');
    });
  }
  handlePayment(id: string) {
    const data = {
      id: id,
      status: 'Pair',
    };
    this.orderServer.updateStatusOrder(data).subscribe((data: any) => {
      this.getAllOrder();
      this.toastr.success('updated status');
    });
  }
  handelDetailsBooking(id: string) {
    window.location.href = '';
  }
}
