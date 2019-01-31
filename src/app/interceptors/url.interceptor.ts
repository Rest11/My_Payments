import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const updateOptions = {
            url: `${environment.restServerURL}/api/${environment.apiVersion}${request.url}`,
        };

        return next.handle(request.clone(updateOptions));
    }
}
