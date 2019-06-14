import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRadioModule, MatInputModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { ADMIN_LAYOUT_ROUTES } from './admin-layout.routes';
import { UserProfileComponent } from '../../views/user-profile/user-profile.component';
import { DirectivesModule } from "../../directives/directives.module";
import { DashboardComponent } from "../../views/dashboard/dashboard.component";
import { TransactionsPageComponent } from "../../views/transactions-page/transactions-page.component";
import { PaymentsPageComponent } from "../../views/payments-page/payments-page.component";
import { ComponentsModule } from "../../components/components.module";
import { DataTableModule } from "../../classes/data-table/data-table.module";
import { SubscriptionPageComponent } from "../../views/subscription-page/subscription-page.component";
import { PaymentsStatisticResolver } from '../../views/dashboard/resolvers/payments-statistic.resolver';

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
        ComponentsModule,
        DataTableModule,
        MatRadioModule,
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TransactionsPageComponent,
        PaymentsPageComponent,
        SubscriptionPageComponent,
    ],
    providers: [
        PaymentsStatisticResolver,
    ],
})
export class AdminLayoutModule {}
