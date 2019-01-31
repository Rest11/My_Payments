import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SocialUser } from "angularx-social-login";
import { Subscription } from "rxjs";
import { AppAuthService } from '../../services/app-auth.service';
import { ServerError } from '../../types/server-error';
import { SocialNetwork } from "../../app.constants";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public readonly socialNetwork: typeof SocialNetwork = SocialNetwork;
    // private authSubscription: Subscription;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly router: Router,
    ) {}

    public async signIn (network: string): Promise<void> {
        await this.appAuthService.signIn(network);

        console.log('~~~~~~~~~~- - this.appAuthService.userSubject.getValue()~~~~~~~~~~\n', this.appAuthService.userSubject.getValue());
        if (this.appAuthService.userSubject.getValue()) this.router.navigateByUrl('/');
    }

    // TODO: Temporary
    public async signOut (): Promise<void> {
        await this.appAuthService.signOut();
    }

    public ngOnInit (): void {
/*        this.authSubscription = this.appAuthService.checkAuth().subscribe(() => {
            if (this.appAuthService.userSubject.getValue()) this.router.navigateByUrl('/');
        });*/
        // this.router.navigateByUrl('/');
    }

    public ngOnDestroy (): void {
        // if (this.authSubscription) this.authSubscription.unsubscribe();
    }
}
