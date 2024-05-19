import { IUserRegister, IUserResponse } from 'src/app/interfaces/User';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from './../../utils/instance';
import { environment } from 'src/environment';

interface ILogin {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'accessToken';
  baseURL: any = '';

  TOKEN_USER = 'user';
  constructor(private http: HttpClient) {
    this.baseURL = environment.API_URL;
  }
  /* login */
  loginUser(userInfo: ILogin): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(
      `${this.baseURL}/api/Account/login`,
      userInfo
    );
  }
  //${this.baseURL}/api/Account/login

  // registerUser(user: IUser): Observable<IUserResponse> {
  //   return this.http.post<IUserResponse>(`${baseURL}/sign-up`, user);
  // }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_USER);
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY)!) as string;
  }

  getUserLogin() {
    return JSON.parse(localStorage.getItem(this.TOKEN_USER)!);
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  hasPermission(role: string) {
    const user = JSON.parse(localStorage.getItem(this.TOKEN_USER)!);
    return role == user.role ? true : false;
  }
  /* signup */
  signUpUser(userInfo: IUserRegister): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/api/Account/Register`,
      userInfo
    );
  }

  uploadAvatarUser(file: any): any {
    return this.http.post<any>(
      `${this.baseURL}/api/Account/UploadAvatar`,
      file
    );
  }

  changePassWord(data : any): any {
    return this.http.post<any>(
      `${this.baseURL}/api/Account/ChangePassword`,
      data
    );
  }
}
