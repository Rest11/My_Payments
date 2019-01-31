import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthenticatedGuard],
        canActivateChild: [AuthenticatedGuard],
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
    },
    {
        path: '',
        component: UnauthorizedLayoutComponent,
        loadChildren: './layouts/unauthorized-layout/unauthorized-layout.module#UnauthorizedLayoutModule',
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

// TODO: remove after testing
/*
app:user
{
    "id":222,
    "createdAt":"2018-07-10T13:17:20.000Z",
    "updatedAt":"2018-11-05T15:51:14.395Z",
    "email":"test@test.test",
    "displayName":"Max_Shynkarenko",
    "avatar":"http://localhost:4226/users/4182403cdd997704f1ea0e77cbb00135d91036bf7c9eea41fed891a9e3962708.png",
    "currentToken":"1419952279eb0ba144bf43aec81428c8495c496239cd41a2f7f594ac5db6cca9"
}
*/
