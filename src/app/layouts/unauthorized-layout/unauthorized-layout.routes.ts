import { Routes } from '@angular/router';
import { SignInComponent } from '../../views/sign-in/sign-in.component';
import { RoutingContract } from "../../contracts/routing.contract";

export const UNAUTHORIZED_LAYOUT_ROUTES: Routes = [
    {
        path: RoutingContract.AdminLayout.SIGN_IN,
        component: SignInComponent,
    },
];
