import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ILogin, IUser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(
    private login: AuthService,
    private fb: FormBuilder,
    private direct: Router
  ) {}
  FormLogin = this.fb.group({
    email: [
      '',
      [
        Validators.required,
      ],
    ],
    password: ['', [Validators.required]],
  });

  get checkEmail() {
    return this.FormLogin.get('email') as FormControl;
  }

  get checkPassword() {
    return this.FormLogin.get('password') as FormControl;
  }

  onLogin() {
    const Login: ILogin = {
      email: this.FormLogin.value.email || '',
      password: this.FormLogin.value.password || '',
    };
    console.log('Dữ liệu gửi lên:', Login);
    this.login
      .loginUser(Login).subscribe((data) => {
        console.log(data.data,"data login");
        localStorage.setItem(
          this.login.TOKEN_KEY,
          JSON.stringify(data.data.token)
        );
        localStorage.setItem(this.login.TOKEN_USER, JSON.stringify(data.data));
        this.redirect(data.data)
      });

  }

  redirect(user: IUser) {
      this.direct.navigateByUrl('/');
  }
}
