import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Subscription } from "rxjs";
import { delay, tap } from "rxjs/operators";
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

    public isInProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) {}

    public async signIn (): Promise<void> {
        try {
            this.isInProgress.next(true);
            const currentToken: TokenModel | null = await this.appAuthService.signIn();

            if (!currentToken) {
                this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
                return;
            }

            this.saveUserSubscription = this.userService.getUserData(currentToken).pipe(
                delay(0),
                tap(() => this.isInProgress.next(false)),
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
            this.isInProgress.next(false);
            this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
        }
    }
}
