import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategory, IDocCategories } from 'src/app/interfaces/Category';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/utils/instance';
import { Router } from '@angular/router';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //Proxy rest_api at file proxy.conf.json
  baseURL: string = '';
  categories: ICategory[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = environment.API_URL;
  }
  getAccessToken() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
    if (!accessToken || accessToken === '') {
      this.router.navigate(['/login-admin']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };
    return options;
  }
  // getAccessToken() {
  //   const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
  //   if (!accessToken || accessToken === '') {
  //     this.router.navigate(['/login-admin']);
  //   }
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${accessToken}`,
  //   });
  //   const options = { headers: headers };
  //   return options;
  // }
  // baseURL: string = `${baseURL}/category`;
  // categories: ICategory[] = [];
  // constructor(private http: HttpClient) {}
  /* getAllCategories */
  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/FieldArea/GetAll`);
  }
  /* Thêm mới category */
  addNewCategory(category: ICategory): Observable<ICategory> {
    // const options = this.getAccessToken();
    return this.http.post<ICategory>(
      `${this.baseURL}/api/FieldArea/Create`,
      category
    );
  }
  /* delete category */
  deleteCategory(id: string): Observable<ICategory> {
    // const options = this.getAccessToken();
    return this.http.post<ICategory>(
      `${this.baseURL}/api/FieldArea/Delete/${id}`,
      {}
    );
  }
  /* update category */
  updateCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/FieldArea/Edit`, category);
  }
  /* get category by id */
  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/api/FieldArea/GetFieldArea/${id}`
    );
  }
  /*get related posts by id category */
  getRelatedPost(id: string) {
    return this.http.get<{ message: string; data: ICategory }>(
      `http://localhost:8080/api/v1/categories/posts/${id}`
    );
  }
  /*get posts by category id */
  getCategoryPostId(
    id: string
  ): Observable<{ message: string; data: ICategory }> {
    return this.http.get<{ message: string; data: ICategory }>(
      `${baseURL}/categories/posts/${id}`
    );
  }
}
