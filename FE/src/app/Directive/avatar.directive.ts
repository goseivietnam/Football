import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../utils/instance';
import { UserService } from '../services/users/user.service';
import { AuthService } from '../services/auth/auth.service';
import { IUser, IUserRequest } from '../interfaces/User';

@Directive({
  selector: '[appAvatar]',
})
export class AvatarDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private user: UserService,
    private auth: AuthService,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUserLogin();

    const avatar = this.document.querySelector('.img-account-profile') as any;
    const avatarHeader = this.document.querySelector('.avatarHeader') as any;
    const btnUpload = this.document.querySelector('.btn-upload-img') as any;
    const file = this.document.querySelector('#file') as HTMLInputElement;

    btnUpload?.addEventListener('click', () => {
      file.click();
    });

    file.addEventListener('change', (e) => {
      const fileImg = e.target as any;
      return new Promise((resolve, reject) => {
        const formData: FormData = new FormData();
        formData.append('images', fileImg.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileImg.files[0]);
        fileReader.onload = () => {
          this.http
            .post<any>(`${baseURL}/images/upload`, formData)
            .subscribe((data) => {
              const editUser: IUserRequest = {
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: data.urls[0].url,
              };
              this.user.updateUser(user._id, editUser).subscribe((data) => {
                localStorage.setItem(
                  this.auth.TOKEN_USER,
                  JSON.stringify(data.user)
                );
                // window.location.reload();
              });
            });
          avatar.src = fileReader.result;
          avatarHeader.src = fileReader.result;
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    });
  }
}
