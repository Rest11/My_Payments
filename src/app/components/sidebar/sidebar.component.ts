import { Component } from '@angular/core';
import { NavigationEntry } from '../../types/navigation-entry';
import { RoutingContract } from '../../contracts/routing.contract';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    public menuItems: NavigationEntry[] = [
        {
            path: RoutingContract.AdminLayout.DASHBOARD,
            title: 'dashboard',
            icon: 'dashboard',
        },
        {
            path: RoutingContract.AdminLayout.USER_PROFILE,
            title: 'my profile',
            icon:'person',
        },
        {
            path: RoutingContract.AdminLayout.TRANSACTIONS,
            title: 'my transactions',
            icon:'list',
        },
        {
            path: RoutingContract.AdminLayout.PAYMENTS,
            title: 'payment',
            icon:'payment',
        },
        {
            path: RoutingContract.AdminLayout.SUBSCRIPTION,
            title: 'subscription',
            icon:'restore',
        },
    ];

    constructor () { }
}
