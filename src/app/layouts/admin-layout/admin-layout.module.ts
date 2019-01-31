import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADMIN_LAYOUT_ROUTES } from './admin-layout.routes';
import { UserProfileComponent } from '../../views/user-profile/user-profile.component';
import { MatButtonModule, MatInputModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { DirectivesModule } from "../../directives/directives.module";
import { DashboardComponent } from "../../views/dashboard/dashboard.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_LAYOUT_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatInputModule,
        MatTooltipModule,
        DirectivesModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
    ],
})
export class AdminLayoutModule {}
