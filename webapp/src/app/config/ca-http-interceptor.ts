import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DialogsService} from '../dialogs/dialogs.service';

export class CaHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getStoredToken();
    if (token !== null) {
      const request = req.clone({setHeaders: {Authorization: token.token_type + ' ' + token.access_token}});
      return this.handleHttpRequest(request, next);
    } else {
      return this.handleHttpRequest(req, next);
    }
  }


  private handleHttpRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((response: HttpErrorResponse) => {

      const errorMessage = {title: '', message: ''};

      if (response.status === 401) {
        errorMessage.title = 'Error Occurred while logging in:';
        errorMessage.message = 'Invalid Account name or Password';
      }

      if (response.status === 0) {
        errorMessage.title = 'API is currently offline';
        errorMessage.message = 'Come back later.';
      }

      return Observable.throw(errorMessage);
    });
  }

  private getStoredToken() {
    const token = localStorage.getItem('authToken');
    return JSON.parse(token);
  }
}
