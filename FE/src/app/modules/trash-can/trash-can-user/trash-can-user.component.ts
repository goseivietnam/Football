import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/users/user.service';

@Component({
  selector: 'app-trash-can-user',
  templateUrl: './trash-can-user.component.html',
  styleUrls: ['./trash-can-user.component.scss'],
})
export class TrashCanUserComponent {
  users: Omit<IUser, 'postList'>[] = [];
  theadTable: string[] = [
    'STT',
    'Tên',
    'Email',
    'Quyền',
    'Trạng thái',
    'Action',
  ];
  constructor(private toastr: ToastrService, private userService: UserService) {
    this.getAllUserDeleted();
  }
  /* get all user deleted */
  getAllUserDeleted() {
    return this.userService.getAllUserDeleted().subscribe((res) => {
      this.users = res.docs;
    });
  }
  /* restore user */
  restoreUser(id: string) {
    return this.userService.restoreUser(id).subscribe(() => {
      this.toastr.success('Khôi phục thành công');
      this.getAllUserDeleted();
    });
  }
  /* delete user real */
  deleteUserReal(id: string) {
    return this.userService.deleteUserReal(id).subscribe(() => {
      Swal.fire({
        title: 'Are you sure want to remove?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
            .then(() => {
              this.toastr.success('Xóa thành công');
              this.getAllUserDeleted();
            })
            .catch(() => {
              this.toastr.error('Xóa bài đăng thất bại');
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }
      });
    });
  }
}
