import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { DashboardService } from "../../services/dashboard.service";
import { UsersAmountGraphDataModel } from "../../models/users-amount-graph-data.model";
import { PaymentsAmountGraphDataModel } from "../../models/payments-amount-graph-data.model";
import { PaymentsSumGraphDataModel } from "../../models/payments-sum-graph-data.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    public userGraphId: string = 'userGraphId';
    public userTableName: string = 'Amount of users';
    public userRequestsGetter: Observable<UsersAmountGraphDataModel[]> = this.dashboardService.getUsers.bind(this.dashboardService);

    public paymentsAmountGraphId: string = 'paymentsAmountGraphId';
    public paymentsAmountTableName: string = 'Amount of payments';
    public paymentsAmountRequestsGetter: Observable<PaymentsAmountGraphDataModel[]> = this.dashboardService.getPaymentsAmount.bind(this.dashboardService);

    public paymentsSumGraphId: string = 'paymentsSumGraphId';
    public paymentsSumTableName: string = 'Sum of payments';
    public paymentsSumRequestsGetter: Observable<PaymentsSumGraphDataModel[]> = this.dashboardService.getPaymentsSum.bind(this.dashboardService);

    constructor (
        private readonly dashboardService: DashboardService,
    ) {}
}
