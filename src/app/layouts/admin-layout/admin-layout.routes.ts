import { Routes } from '@angular/router';
import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { UserProfileComponent } from '../../views/user-profile/user-profile.component';
import { RoutingContract } from "../../contracts/routing.contract";
import { TransactionsPageComponent } from "../../views/transactions-page/transactions-page.component";
import { PaymentsPageComponent } from "../../views/payments-page/payments-page.component";

export const ADMIN_LAYOUT_ROUTES: Routes = [
    {
        path: RoutingContract.AdminLayout.DASHBOARD,
        component: DashboardComponent,
    },
    {
        path: '',
        redirectTo: RoutingContract.AdminLayout.DASHBOARD,
        pathMatch: 'full',
    },
    {
        path: RoutingContract.AdminLayout.USER_PROFILE,
        component: UserProfileComponent,
    },
    {
        path: RoutingContract.AdminLayout.TRANSACTIONS,
        component: TransactionsPageComponent,
    },
    {
        path: RoutingContract.AdminLayout.PAYMENTS,
        component: PaymentsPageComponent,
    },
];
