import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Product';
import { IUser } from 'src/app/interfaces/User';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

// import { UserService } from 'src/app/services/users/user.service';

// import { FormBuilder } from '@angular/forms';

// import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogin: boolean = localStorage.getItem('accessToken') ? true : false;
  isHidden: boolean = true;
  userInfo: IUser = JSON.parse(localStorage.getItem(this.auth.TOKEN_USER)!);
  searchValue: string = '';
  searchResult: IPosts[] = [];
  isShowSearch: boolean = false;
  timerId!: any;

  private inputSubject = new Subject<string>();
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private redirect: Router,
    private postsService: ProductsService
  ) {
    if (!this.userInfo) {
      this.redirect.navigate(['/']);
    }
    console.log(this.userInfo);
  }

  handleLogout() {
    Swal.fire({
      title: 'Bạn muốn đăng xuất ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đúng!',
      cancelButtonText: 'Không',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        container: 'swal-container', // Tạo một lớp CSS tùy chỉnh cho container của cảnh báo
        popup: 'swal-popup', // Tạo một lớp CSS tùy chỉnh cho popup của cảnh báo
      },
      background: '#fff',
    }).then((result) => {
      if (result.value) {
        this.auth.logOut();
        this.isLogin = false;
        this.toastr.success('Đăng xuất thành công');
        this.redirect.navigate(['/']);
      }
    });
  }
  toggleDropdown() {
    this.isHidden = !this.isHidden;
  }
  onInputChange(event: any) {
    this.searchValue = String(event.target.value);

    /*clear prev timeout id*/
    clearTimeout(this.timerId);
    this.isShowSearch = true;

    if (!this.searchValue) {
      /*delay when typing*/
      this.isShowSearch = false;
    }
    this.timerId = setTimeout(() => {
      this.postsService
        .searchPost(this.searchValue.trim())
        .subscribe(({ posts }) => {
          this.searchResult = posts.docs;
        });
    }, 700);
  }
  handleClear() {
    (this.searchValue = ''),
      (this.searchResult = []),
      (this.isShowSearch = false);
  }
}
