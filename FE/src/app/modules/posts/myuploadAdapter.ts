import { HttpClient } from '@angular/common/http';
import { baseURL } from 'src/app/utils/instance';

export class MyUploadAdapter {
  uploadedUrl: string = '';
  constructor(private loader: any, private http: HttpClient) {}

  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          const formData: FormData = new FormData();
          formData.append('images', file, file);

          this.http?.post(`${baseURL}/images/upload`, formData).subscribe(
            (response: any) => {
              resolve({ default: response.urls[0].url });

              this.uploadedUrl = response.urls[0].url;
            },
            (error) => {
              // Handle the upload error
            }
          );
        })
    );
  }
}
