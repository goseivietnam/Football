import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUser, IUserRequest } from 'src/app/interfaces/User';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IPosts } from 'src/app/interfaces/Product';
import { UserService } from 'src/app/services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  user!: IUserRequest;
  userLocal: any = JSON.parse(
    localStorage.getItem(this.auth.TOKEN_USER) || '{}'
  );
  urlImage: string = environment.API_URL + '/root/';
  defaultImageUrl =
    'https://cdn5.vectorstock.com/i/1000x1000/51/99/icon-of-user-avatar-for-web-site-or-mobile-app-vector-3125199.jpg';

  listUserPosts!: IPosts[];
  avatarForm: any;
  urls: any[] = [];
  userInfo = this.formUserInfo.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    type: ['', [Validators.required, Validators.required]],
    address: [''],
    phone: [''],
  });
  idUser: any = '';
  constructor(
    private profile: UserService,
    private auth: AuthService,
    private formUserInfo: FormBuilder,
    private router: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.idUser = id;
      this.userService.getIdUser(id!).subscribe((data: any) => {
        console.log(data, 'm');
        // this.user = user;
        this.userInfo.patchValue({
          username: data.data.name,
          email: data.data.email,
          address: data.data.gender,
          phone: data.data.phone,
        });
      });
      // this.profile.getUserPosts(id!).subscribe(
      //   ({ data }) => {
      //     if (data.postList) {
      //       this.listUserPosts = data.postList;
      //     }
      //   },
      //   (err) => {
      //     console.log(err.message);
      //   }
      // );
    });
  }

  get checkUsername() {
    return this.userInfo.get('username') as FormControl;
  }

  get checkEmail() {
    return this.userInfo.get('email') as FormControl;
  }

  get checkAddress() {
    return this.userInfo.get('address') as FormControl;
  }

  get checkPhone() {
    return this.userInfo.get('phone') as FormControl;
  }

  onEdit() {
    const editProfile: any = {
      id: this.idUser || '',
      name: this.userInfo.value.username || '',
      gender: this.userInfo.value.address || '',
      phone: this.userInfo.value.phone || ''
    };
    this.profile.updateUser2(editProfile).subscribe((data) => {
      console.log(data, 'as');
      localStorage.setItem(this.auth.TOKEN_USER, JSON.stringify(data.data));
    });
  }
  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    console.log(files);
    this.urls.push(files[0]);
  }
  handleSubmitPostForm(event: any) {
    event.preventDefault();
    /* lấy ra thông tin người dùng */
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }
    const imageFrom = new FormData();
    console.log(this.urls[0]);
    imageFrom.append('file', this.urls[0]);
    this.auth.uploadAvatarUser(imageFrom).subscribe(
      () => {
        this.toastr.success('thành công');
      },
      () => {
        this.toastr.error('T thất bại');
      }
    );
  }
}
