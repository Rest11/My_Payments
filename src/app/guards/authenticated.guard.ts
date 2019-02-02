import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { AppAuthService } from "../services/app-auth.service";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { CheckingTokenResponse } from "../types/checking-token.response";

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly router: Router,
    ) { }

    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let currentToken: TokenModel;

        if (this.appAuthService.getUserToken) {
            currentToken = new TokenModel({
                currentToken: this.appAuthService.getUserToken,
            });
        } else {
            currentToken = this.appAuthService.getUserTokenFromStorage;
        }

        return this.appAuthService.checkToken(currentToken).pipe(
            map((data: CheckingTokenResponse) => {
                if (!data.isAuthenticated) this.router.navigateByUrl(`/${RoutingContract.AdminLayout.SIGN_IN}`);

                return data.isAuthenticated;
            }),
        );
    }

    public canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}

// TODO: temporary not valid token. Remove after testing
/*
eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmYjA1Zjc0MjM2NmVlNGNmNGJjZjQ5Zjk4NGM0ODdlNDVjOGM4M2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzI4MzA0NTk5MDQtZDB1aGRhOTNjN2pob2tjcTF0MHN2bTVhdWVldGQ5bjUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMjgzMDQ1OTkwNC1kMHVoZGE5M2M3amhva2NxMXQwc3ZtNWF1ZWV0ZDluNS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDkxMTgwNjE2Mjc1NTczNTA5NCIsImVtYWlsIjoic2h5bmthcmVua28ubWF4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidnlDQkdYakVVTVhWOVE4VEhxMjJrUSIsIm5hbWUiOiJNYXggUmVzdCIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLXJjWTlNSE1XS0trL0FBQUFBQUFBQUFJL0FBQUFBQUFBRlBnL24yQnhraFZobE9JL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJNYXgiLCJmYW1pbHlfbmFtZSI6IlJlc3QiLCJsb2NhbGUiOiJydSIsImlhdCI6MTU0OTAzMDg0MiwiZXhwIjoxNTQ5MDM0NDQyLCJqdGkiOiIxNTQwZGI2YTA0NWRlODYxYjE5N2U1YjFjZDBlZGIzMWY1NjJlMTRjIn0.bDoEVJW2eGQBgPbh0It4Wuzp4QC1IJvZXAVQFvZsdl72b85ddgXbTKR4y0-NfYnUSvtUyCCifTiPRuTaytF5VHiDM3ES0GNgywB1S7sdi3OpeW2Sc4lgwZSrr0CoiY7H-DCxygpiuDx-HM8rEnXs8q-Q83dHhZBcv4V9oP33B4LWrglYRZx60WCXYRxOYRIDphpTmhiWHdi_Bn_G0mSB_Lj8f9nDsonJbNiEvvBJBn30ISMxiTp3SLFsEFvkXHONh9-r08ozKFBOe32dAwURbYJD22HUyTc_PhH8TTJ80XAdJX1NIvMCTS8tq8_YY0UH1pTWck9JNn0Bu-t7aGjL6g
*/
