import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppAuthService } from '../services/app-auth.service';
import { Headers } from '../enums/headers.enum';
import { TokenModel } from "../models/token.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (
        private readonly appAuthService: AppAuthService,
    ) { }

    public intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken: TokenModel | null = this.appAuthService.userTokenFromStorage;

        if (!userToken) return next.handle(request);

        const token: string = userToken.currentToken;
        const headers: HttpHeaders = request.headers.append(Headers.AUTHORIZATION, token);
        const updateOptions = { headers };

        return next.handle(request.clone(updateOptions));
    }
}
