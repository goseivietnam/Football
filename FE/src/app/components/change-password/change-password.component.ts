import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  userPasswordChange = this.changePassFrom.group({
    oldPassword: ['', [Validators.required, Validators.minLength(3)]],
    newPassword: ['', [Validators.required, Validators.email]],
    confirmPassword: ['', [Validators.required, Validators.required]],
  });

    constructor(private changePassFrom: FormBuilder,private toastr: ToastrService ,private auth: AuthService,){


  }
  changePassWord(){
    const changePass: any = {
      oldPassword: this.userPasswordChange.value.oldPassword || '',
      newPassword: this.userPasswordChange.value.newPassword || '',
      confirmPassword: this.userPasswordChange.value.confirmPassword || '',
    };
    this.auth.changePassWord(changePass).subscribe((data : any) => {
     console.log(data);
    });
  }
}
