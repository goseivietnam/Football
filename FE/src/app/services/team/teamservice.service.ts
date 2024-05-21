import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamserviceService {
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
  getAllTeamByUser(): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Team/FindTeam`, {});
  }
  deleteTeam(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Team/Delete/${id}`, {});
  }
  createTeamByUser(team: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Team/Create`, team);
  }
  getIdTeam(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/Team/Get/${id}`);
  }
  editTeamByUser(team: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Team/Edit`, team);
  }
  createInvit(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Invite/Create`, data);
  }

  getMyTeam(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/api/Team/GetByUser`);
    // GetByUser
  }

  //
  getDataInviteByUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Invite/GetData`, data);
    // Invite/GetData
  }

  // action
  actionOnInviteAPI(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/Invite/Accept`, data);
  }

  getInvitWithMe(){
    // /api/Invite/InviteMe
    return this.http.get<any>(`${this.baseURL}/api/Invite/InviteMe`);
  }

  getInvitedWithMe(){
    // /api/Invite/InvitedMe
    return this.http.get<any>(`${this.baseURL}/api/Invite/IInvite`);
  }

  getInviAcceptMe(){
    // /api/Invite/InviteMe
    return this.http.get<any>(`${this.baseURL}/api/Invite/AcceptedMe`);
  }
  getRejectedMe(){
    // /api/Invite/InviteMe
    return this.http.get<any>(`${this.baseURL}/api/Invite/RejectMe`);
  }
}
