import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent {
  paginationObj: any = {
    currentPage: 1,
    totalDocs: 0,
    limt: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };
  urlImage: string = environment.API_URL + '/root/';
  dataUser: any = {};
  title: string = 'Quản lý người dùng';
  titleModal: string = 'Thêm người dùng';
  linkActive: string = '/admin/add-user';
  theadTable: string[] = [
    'STT',
    'Ảnh',
    'Tên',
    'Giới tính',
    'Email',
    'Quyền',
    'Action',
  ];
  usersList: any[] = [];
  userForm = this.builder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
    is_active: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
  });
  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute // private activatedRoute: ActivatedRoute
  ) {
    this.getAllUsers();
  }
  /* handle delete user */
  handleDeleteUser(id: string) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user._id === id) {
      this.toastr.warning('Không thể tự xóa chính mình.');
      return;
    }
    this.userService.deleteUserFake(id).subscribe(() => {
      this.toastr.success('Xóa thành công.');
      this.getAllUsers();
    });
  }
  /* get All users */

  getAllUsers() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      // const type = params.get('type');
      const type = params['type'];
      console.log(type);
      if (type) {
        this.userService
          .getUserByAll({
            type: type,
          })
          .subscribe((users: any) => {
            console.log(users.data.items, 'users');
            this.usersList = users.data.items;
          });
      }
    });
  }
  /* handle Thêm mới user */
  handleAddNewUser() {
    console.log(this.userForm.value);
  }
  gotoPage(page: number | string) {
    this.paginationObj.currentPage = page;
    this.getAllUsers();
    // this.getAllPost();
  }

  prevPage(hasPrev: boolean) {
    this.paginationObj.hasPrevPage = hasPrev;
    if (this.paginationObj.hasPrevPage) {
      this.paginationObj.currentPage--;
      this.getAllUsers();
    }
  }

  nextPage(hasNext: boolean) {
    this.paginationObj.hasNextPage = hasNext;

    if (this.paginationObj.hasNextPage) {
      this.paginationObj.currentPage++;
      this.getAllUsers();
    }
  }
  handelGetIdUser(userId: string) {
    this.userService.getIdUser(userId).subscribe((user: any) => {
      console.log(user, 'user');
      this.dataUser = user.data;
    });
  }
  handelRemoveUser(id: any) {
    this.userService.removeIdUser(id).subscribe((user: any) => {
      this.toastr.success('removed successfully');
      this.getAllUsers();
    });
  }
}
