import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, map, pluck } from 'rxjs/operators';
import { CommonComponent } from '../../classes/common-component';
import { AppAuthService } from '../../services/app-auth.service';
import { RoutingContract } from "../../contracts/routing.contract";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends CommonComponent implements OnInit {
    public name: Observable<string>;
    public email: Observable<string>;
    public avatar: Observable<string>;

    constructor (
        private readonly appAuthService: AppAuthService,
        private readonly router: Router,
    ) {
        super();
    }

    public ngOnInit () : void {
        this.name = this.appAuthService.userSubject
            .pipe(
                filter((user) => !!user),
                pluck('name'),
            );
        this.email = this.appAuthService.userSubject
            .pipe(
                filter((user) => !!user),
                pluck('email'),
            );
        this.avatar = this.appAuthService.userSubject
            .pipe(
                filter((user) => !!user),
                pluck('avatar'),
                map((link: string) => link || '/assets/img/user-placeholder.png'),
            );
    }

    public async signOut () : Promise<void> {
        this.appAuthService.signOut();
        this.router.navigateByUrl(`/${RoutingContract.AdminLayout.SIGN_IN}`);
    }
}
