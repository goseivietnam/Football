import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login-page-admin',
  templateUrl: './login-page-admin.component.html',
  styleUrls: ['./login-page-admin.component.scss'],
})
export class LoginPageAdminComponent {
  isAdminUser: boolean = false;
  loginForm = this.builder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
      if (accessToken === '') {
        this.router.navigate(['/login-admin']);
      }
      const date = new Date();
      const time = date.getTime() / 1000;
      const decodeToken: any = jwt_decode(accessToken);
      if (decodeToken.exp < time) {
        this.router.navigate(['/login-admin']);
      }
    }
  }
  handleSubmitLoginForm() {
    if (this.loginForm.invalid) {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const user = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
    this.authService.loginUser(user).subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['/']);
          this.toastr.warning('Vui lòng nhập đầy đủ thông tin');
        }
        if (true) {
          console.log(user,"user")
          // this.isAdminUser = true;
          localStorage.setItem('accessToken', JSON.stringify(user.data.token));
          localStorage.setItem('user', JSON.stringify(user.data));
          this.router.navigateByUrl('/admin');
          this.router.navigate(['/admin']);
          this.toastr.success('Đăng nhập thành công');
        } else {
          this.toastr.warning('Tài khoản hoặc mật khẩu không đúng');
        }
      },
      () => {
        this.toastr.warning('Tài khoản hoặc mật khẩu không đúng');
      }
    );

    //   if (user.user.role === 'admin') {
    //     this.isAdminUser = true;
    //     localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
    //     localStorage.setItem('user', JSON.stringify(user.user));
    //     this.router.navigate(['/admin']);
    //   }

    //   if (user.user.role === 'user') {
    //     this.isAdminUser = true;
    //     localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
    //     localStorage.setItem('user', JSON.stringify(user.user));
    //     this.router.navigate(['/']);
    //   }
    // });
  }
}
