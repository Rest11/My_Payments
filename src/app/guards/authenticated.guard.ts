import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppAuthService } from "../services/app-auth.service";
import { RoutingContract } from "../contracts/routing.contract";
import { CheckingTokenModel } from "../models/checking-token.model";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly router: Router,
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.appAuthService.checkToken().pipe(
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
