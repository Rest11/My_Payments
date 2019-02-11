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
