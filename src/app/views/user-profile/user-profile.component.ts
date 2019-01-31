import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, pluck } from 'rxjs/operators';
import { CommonComponent } from '../../classes/CommonComponent';
import { AppAuthService } from '../../services/app-auth.service';
import { UserModel } from '../../models/user.model';
import { NotificationsService } from '../../services/notifications.service';
import { RoutingContract } from "../../contracts/routing.contract";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends CommonComponent implements OnInit {
    public currentName: Observable<string>;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly notifier: NotificationsService,
        private readonly router: Router,
    ) {
        super();
    }

    public ngOnInit () : void {
        this.currentName = this.appAuthService.userSubject
            .pipe(
                filter((user) => !!user),
                pluck('displayName'),
            );

        const userSnapshot: UserModel = this.appAuthService.userSubject.value;
        /*
        userSnapshot.email
        userSnapshot.displayName
         */
    }

    public async signOut () : Promise<void> {
        await this.appAuthService.signOut();
        this.router.navigateByUrl(`/${RoutingContract.AdminLayout.SIGN_IN}`);
        /*this.usersService.signOut()
            .subscribe(() => {
                // noinspection JSIgnoredPromiseFromCall
                this.router.navigate(['/']);
            });*/
    }
}
