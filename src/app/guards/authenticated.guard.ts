import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { AppAuthService } from "../services/app-auth.service";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { CheckingTokenModel } from "../models/checking-token.model";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly router: Router,
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const currentToken: TokenModel = this.appAuthService.userTokenFromStorage;

        return this.appAuthService.checkToken(currentToken).pipe(
            map((data: CheckingTokenModel) => {
                if (!data.isAuthenticated) this.router.navigateByUrl(`/${RoutingContract.AdminLayout.SIGN_IN}`);

                return data.isAuthenticated;
            }),
        );
    }

    public canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
