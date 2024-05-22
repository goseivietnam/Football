import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDocPosts, IPostAnalytics, IPosts } from 'src/app/interfaces/Product';

import { IUser } from 'src/app/interfaces/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseURL } from 'src/app/utils/instance';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: any = '';
  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = environment.API_URL;
    this.getAccessToken();
  }
  getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken || accessToken === '') {
      this.router.navigate(['/login-admin']);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };
    return options;
  }
  getAllPosts(): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Field/GetData`, {});
  }
  getPostsApporved(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Field/GetData`, {});
  }
  getPostsRelate(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Field/GetData`, data);
  }
  getPost(
    id: number | string,
    ngay: number,
    thang: number,
    nam: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/api/Field/GetField?id=${id}&ngay=${ngay}&thang=${thang}&nam=${nam}`
    );
  }
  deleteFakePost(id: number | string) {
    return this.http.post(`${this.baseURL}/api/Field/Delete/${id}`, {});
  }
  createPost(post: any): Observable<any> {
    return this.http.post(`${this.baseURL}/api/Field/Create`, post);
  }

  updatePost(post: any): Observable<any> {
    // const options = this.getAccessToken();
    return this.http.post(`${this.baseURL}/api/Field/Edit`, post);
  }
  deleteServiceField(id: number | string){
    return this.http.delete(`${this.baseURL}/api/FieldServiceFee/Delete/${id}`)
  }
  editServiceField(data : any){
    return this.http.post(`${this.baseURL}/api/FieldServiceFee/Edit`,data)
  }
  createServiceField(data : any){
    return this.http.post(`${this.baseURL}/api/FieldServiceFee/Create`,data)
  }

  getByFieldId(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/api/FieldServiceFee/GetByFieldId/${id}`
    );
  }

  /* get post by id */
  getPostById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/api/Field/GetField/${id}`
    );
  }

  /* get posts by id user */
  getPostByIdUser(id: string): Observable<{ message: string; data: IUser }> {
    return this.http.get<{ message: string; data: IUser }>(
      `${this.baseURL}/users/posts/all/${id}`
    );
  }

  /*Search posts by title */
  searchPost(keyword: string): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts/approved?q=${keyword}`);
  }
  /* get post with delete: true */
  getPostDeleted(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(
      `${baseURL}/posts/deleted/all?_limit=10&_page=1`
    );
  }
  /* undo delete post */
  undoDeletePost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/restore/${id}`, {});
  }
  /* delete post */
  deletePost(id: string): Observable<IPosts> {
    return this.http.delete<IPosts>(`${this.baseURL}/posts/${id}`);
  }
  /* lấy số liệu người dùng được tạo ra trong 1 ngày/ 1 tuần */
  getPostByDate(): Observable<IPostAnalytics[]> {
    return this.http.get<IPostAnalytics[]>(
      `${this.baseURL}/posts/counter/post-new`
    );
  }
  /* lấy ra các bài viết trạng thái pending */
  getPostPending(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${this.baseURL}/posts/pending/all`);
  }
  /* update status approved */
  updateApprovedPost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/approved/${id}`, {});
  }
  /* update status pending */
  updatePendingPost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/pending/${id}`, {});
  }

  /* filter price */
  filterPrice(
    min: number,
    max: number
  ): Observable<{ message: string; posts: IPosts[] }> {
    return this.http.get<{ message: string; posts: IPosts[] }>(
      `${this.baseURL}/posts/filter/price?min=${min}&max=${max}`
    );
  }
  createBookingFb(post: any) {
    return this.http.post(
      `${this.baseURL}/api/Booking/Create
      `,
      post
    );
  }
  createVnPaymentFb(post: any) {
    return this.http.post(
      `${this.baseURL}/api/ServiceFeePayment/Create
      `,
      post
    );
  }
  updateStatusField(data: any) {
    return this.http.post(
      `${this.baseURL}/api/Field/UpdateStatus
      `,
      data
    );
    // api/Field/UpdateStatus
  }
}
