import { AfterViewInit, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, public loader: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    Promise.resolve().then(() => this.loader.isLoading.next(true));
    // generate global token when login
    const token = this.auth.getToken();

    if (token) {
      request = request.clone({
        headers: new HttpHeaders({
          authorization: `Bearer ${token}`,
        }),
      });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.loader.isLoading.next(false);
      })
    );
  }
}
