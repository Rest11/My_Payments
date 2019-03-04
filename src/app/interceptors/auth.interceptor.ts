import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppAuthService } from '../services/app-auth.service';
import { Headers } from '../enums/headers.enum';
import { TokenModel } from "../models/token.model";
import { AuthPlatformModel } from "../models/auth-platform.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (
        private readonly appAuthService: AppAuthService,
    ) { }

    public intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userToken: TokenModel | null = this.appAuthService.userTokenFromStorage;
        const authPlatform: AuthPlatformModel | null = this.appAuthService.authPlatformFromStorage;

        if (!userToken || !authPlatform) return next.handle(request);

        const token: string = userToken.currentToken;
        const platform: string = authPlatform.authPlatform;

        const headers: HttpHeaders = request.headers
            .append(Headers.AUTHORIZATION, token)
            .append(Headers.AUTH_PLATFORM, platform);

        const updateOptions = { headers };

        return next.handle(request.clone(updateOptions));
    }
}
