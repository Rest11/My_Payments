import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AppAuthService } from '../../services/app-auth.service';
import { NotificationMessage, AuthPlatform } from "../../app.constants";
import { UserService } from "../../services/user.service";
import { TokenModel } from "../../models/token.model";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    public readonly AuthPlatform: typeof AuthPlatform = AuthPlatform;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly toastr: ToastrService,
    ) {}

    public async signIn (platform: string): Promise<void> {
        try {
            const currentToken: TokenModel | null = await this.appAuthService.signIn(platform);

            if (!currentToken) {
                this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
                return;
            }

            this.userService.getUserData().subscribe(
                (userData: UserModel) => {
                    this.appAuthService.saveUserIntoStorage(userData);
                    this.router.navigateByUrl('/');
                },
                () => {
                    this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
                },
            );
        } catch (err) {
            this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
        }
    }
}
