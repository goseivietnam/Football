import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//http://localhost:8080/api/analytics-all?done=1
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  baseURL: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = `http://localhost:8080/api/`;
  }
  getTotalAnalyticsDone(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}analytics-all?done=1`);
  }
  getAllOrderDone(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}getall-order?done=1`);
  }
}
