import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  baseURL = '';
  constructor(private http: HttpClient) {
    this.baseURL = `${baseURL}/images`;
  }
  uploadImage = (files: File[]): Observable<any> => {
    const uploadData = new FormData();
    for (let file of files) {
      uploadData.append('images', file);
    }
    return this.http.post<any>(`${this.baseURL}/upload`, uploadData);
  };
  deleteImage = (public_id: string): Observable<any> => {
    return this.http.delete<any>(`${this.baseURL}/${public_id}`);
  };
}
