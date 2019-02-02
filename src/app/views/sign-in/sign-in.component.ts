import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { AppAuthService } from '../../services/app-auth.service';
import { NotificationMessage, SocialNetwork } from "../../app.constants";
import { UserService } from "../../services/user.service";
import { UserTokenDto } from "../../types/user-token-dto";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    public readonly socialNetwork: typeof SocialNetwork = SocialNetwork;
    private saveUserSubscription: Subscription;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) {}

    public async signIn (network: string): Promise<void> {
        try {
            await this.appAuthService.signIn(network);

            const userToken: string | null = this.appAuthService.getUserToken;

            if (!userToken) {
                this.toastr.error(NotificationMessage.NOT_AUTHENTICATED, 'getUserToken');
                return;
            }

            const userDataDto: UserTokenDto = {
                userToken,
            };
            this.saveUserSubscription = this.userService.saveUserData(userDataDto).pipe(
                delay(0),
            ).subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                () => {
                    this.toastr.error(NotificationMessage.NOT_AUTHENTICATED, 'saveUserSubscription');
                },
                () => {
                    this.saveUserSubscription.unsubscribe();
                },
            );
        } catch (err) {
            this.toastr.error(NotificationMessage.NOT_AUTHENTICATED, 'catch');
        }
    }

    // TODO: Temporary
    public signOut (): any {
        this.appAuthService.signOut();
    }
}
