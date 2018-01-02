import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class CaHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getStoredToken();

    if (token !== null) {
      const request = req.clone({setHeaders: {Authorization: token.token_type + ' ' + token.access_token}})
      return next.handle(request);
      // return this.handleHttpRequest(request, next);
    } else {
      return next.handle(req);
      // return this.handleHttpRequest(req, next);
    }
  }


  private handleHttpRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return null;
  }

  private getStoredToken() {
    const token = localStorage.getItem('authToken');
    return JSON.parse(token);
  }
}
