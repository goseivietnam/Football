import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserRequest } from 'src/app/interfaces/User';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-don-hang',
  templateUrl: './don-hang.component.html',
  styleUrls: ['./don-hang.component.scss'],
})
export class DonHangComponent {
  user!: IUserRequest;

  listOrder: any;

  constructor(
    private Toast: ToastrService,
    private router: Router,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.userService.getUser(this.user._id!).subscribe(({ user }) => {
      this.user = user;
      this.listOrder = (user as any).buyed as any;

    });
  }

  handleFomatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
