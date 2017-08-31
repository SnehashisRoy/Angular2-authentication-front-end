import { AuthService } from './../services/auth.service';
import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private inj:Injector) {}

  
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const auth = this.inj.get(AuthService);
    const authHeader = auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)
                                                   .set('Content-Type', 'application/json')});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}