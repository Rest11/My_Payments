import { Component } from '@angular/core';
import { NavigationEntry } from '../../types/navigation-entry';
import { RoutingContract } from '../../contracts/routing.contract';
import { AppAuthService } from "../../services/app-auth.service";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    public readonly user: UserModel = this.usersService.userSubject.getValue();
    public menuItems: NavigationEntry[] = [
        {
            path: RoutingContract.AdminLayout.DASHBOARD,
            title: 'Dashboard',
            icon: 'dashboard',
        },
        {
            path: RoutingContract.AdminLayout.USER_PROFILE,
            title: 'My profile',
            icon:'person',
        },
    ];

    constructor (
        private readonly usersService: AppAuthService,
    ) { }
}
