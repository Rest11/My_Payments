import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppAuthService } from '../services/app-auth.service';
import { Headers } from '../enums/headers.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (
        private readonly appAuthService: AppAuthService,
    ) { }

    public intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken: string | null = this.appAuthService.getUserToken;

        if (!userToken) return next.handle(request);

        const headers: HttpHeaders = request.headers.append(Headers.AUTHORIZATION, userToken);
        const updateOptions = { headers };

        return next.handle(request.clone(updateOptions));
    }
}
