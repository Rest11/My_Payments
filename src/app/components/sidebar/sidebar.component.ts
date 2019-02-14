import { Component } from '@angular/core';
import { NavigationEntry } from '../../types/navigation-entry';
import { RoutingContract } from '../../contracts/routing.contract';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
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
        {
            path: RoutingContract.AdminLayout.TRANSACTIONS,
            title: 'My transactions',
            icon:'list',
        },
        {
            path: RoutingContract.AdminLayout.PAYMENTS,
            title: 'Payments',
            icon:'payment',
        },
    ];

    constructor () { }
}
