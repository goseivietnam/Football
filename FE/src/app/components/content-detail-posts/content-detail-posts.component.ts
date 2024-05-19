import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IPosts } from 'src/app/interfaces/Product';
import { IUserRequest } from 'src/app/interfaces/User';
import { CartService } from 'src/app/services/cart/cart.service';
import { handleFomatDate } from 'src/app/utils/fomatDate';

@Component({
  selector: 'app-content-detail-posts',
  templateUrl: './content-detail-posts.component.html',
  styleUrls: ['./content-detail-posts.component.scss'],
})
export class ContentDetailPostsComponent {
  @Input() post!: IPosts;
  dateFomat: string = '';
  userId!: string;
  user!: IUserRequest;
  idProduct!: string;
  constructor(
    private cartService: CartService,
    private Toast: ToastrService,
    private router: Router,
    private params: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.user._id || '';
  }
  handleFomatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  addToCart() {
    const id = this.params.snapshot.params['id'];

    if (!this.userId) {
      this.Toast.warning('Bạn cần phải đăng nhập');
    }

    this.cartService.addCart(this.userId, id).subscribe(() => {
      this.Toast.success('Thêm  thành công');
      this.router.navigate(['/cart']);
    });
  }
}
