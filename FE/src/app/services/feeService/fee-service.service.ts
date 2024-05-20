import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeServiceService {

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

  createFeeService(feeService: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/FieldServiceFee/Create`, feeService);
  }

  getFeeServiceByBookingId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/FieldServiceFee/GetByBookingId/${id}`);
  }

  editFeeService(feeService: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/FieldServiceFee/Edit`, feeService);
  }

  getFeeServiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/FieldServiceFee/Get/${id}`);
  }
}
