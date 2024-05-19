import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocCategories } from 'src/app/interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL: string = '';
  cart: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = `http://localhost:8080/api/`;
  }

  /* getAllCart */
  getAllCart(id: string): Observable<any> {
    return this.http.get<IDocCategories>(`${this.baseURL}getall-cart/${id}`);
  }
  /* Thêm mới cart */
  addCart(id: string, idPod: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}add-to-cart/${id}`, { idPod });
  }
  /* delete cart */
  deleteItemCart(id: string, idPod: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseURL}remove-to-cart/${id}/${idPod}`
    );
  }
}
