import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser, IUserRequest } from 'src/app/interfaces/User';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  user!: any;
  imagePreview: any;
  userForm = this.fb.group({
    username: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', [Validators.required]],
    avatar: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private redirect: Router,
    private toastr: ToastrService,
    private ImageService: UploadImageService,
    private params: ActivatedRoute

  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.userService.getIdUser(id!).subscribe((data :any) => {
        console.log(data);
        this.user = data.data;

        this.userForm.patchValue({
          username: data.data.name,
          email: data.data.email,
          role: data.data.type,
          phone : data.data.phone
        });
      });
    });
  }

  handleGetFileInput(fileInput: any) {
    const file = fileInput.target.files;
    // console.log(file);
    this.ImageService.uploadImage(file).subscribe(
      (data) => {
        this.userForm.patchValue({
          avatar: data.urls[0].url,
        });
        this.imagePreview = data.urls[0];
        // console.log(this.imagePreview.public_id);

        this.toastr.success('Uploaded avatar');
      },
      () => {
        this.toastr.error('Upload avatar faile');
      }
    );
  }
  handleRemoveImage(public_id: string) {
    this.ImageService.deleteImage(public_id).subscribe(
      () => {
        this.toastr.success('Deleted');
        this.imagePreview = undefined;
      },
      () => {
        this.toastr.error('Delete failed');
      }
    );
  }

  onHandleSubmit() {
    // console.log(this.userForm.value);
    // return;
    const id = this.params.snapshot.params['id']
    const user: any = {
      id : id,
      name: this.userForm.value.username || '',
      type: this.userForm.value.role || 'user',
      gender : this.user.gender,
      phone: this.userForm.value.phone || '',
    };
    this.userService.updateUser2(user).subscribe(
      (data : any) => {
        this.toastr.success('Update successful');
        // this.redirect.navigate(['admin/manager-users']);
        // return;
      },
      () => {
        this.toastr.error('Update failed');
      }
    );
  }
}
