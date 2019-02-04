import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { AppAuthService } from '../../services/app-auth.service';
import { NotificationMessage } from "../../app.constants";
import { UserService } from "../../services/user.service";
import { TokenModel } from "../../models/token.model";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    private saveUserSubscription: Subscription;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) {}

    public async signIn (): Promise<void> {
        try {
            const currentToken: TokenModel | null = await this.appAuthService.signIn();

            if (!currentToken) {
                this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
                return;
            }

            this.saveUserSubscription = this.userService.getUserData(currentToken).pipe(
                delay(0),
            ).subscribe(
                (userData: UserModel) => {
                    this.appAuthService.saveUserIntoStorage(userData);
                    this.router.navigateByUrl('/');
                },
                () => {
                    this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
                },
                () => {
                    this.saveUserSubscription.unsubscribe();
                },
            );
        } catch (err) {
            this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
        }
    }
}
