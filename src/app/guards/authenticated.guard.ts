import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { catchError, delay, filter, map, tap } from 'rxjs/operators';
import { AppAuthService } from '../services/app-auth.service';
import { UserModel } from '../models/user.model';
import { RoutingContract } from "../contracts/routing.contract";
import { AuthService, SocialUser } from "angularx-social-login";
import { empty } from "rxjs/observable/empty";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor (
        private appAuthService: AppAuthService,
        private readonly authService: AuthService,
        private router: Router,
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('~~~~~~~~~~AuthenticatedGuard- - WORK~~~~~~~~~~\n', );
        return this.authService.authState.pipe(
            catchError(err => {
                console.log('~~~~~~~~~~canActivate- - err~~~~~~~~~~\n', err);
                return empty();
            }),
            map((user: SocialUser) => {
                console.log('~~~~~~~~~~canActivate- - user~~~~~~~~~~\n', user);
                if (!user) this.router.navigateByUrl(`/${RoutingContract.AdminLayout.SIGN_IN}`);

                return !!user;
            }),
        );

        // const res: any = await this.authService.authState.toPromise();
        // console.log('~~~~~~~~~~canActivate- - res~~~~~~~~~~\n', res);
        // return true;
    }

    public canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
