import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RoutingContract } from "../../contracts/routing.contract";
import { DashboardService } from "../../services/dashboard.service";
import { PaymentsGraphData } from "../../services/types/payments-graph-data";
import { GraphData } from "../../services/types/graph-data";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public graphData: GraphData[] = [];

    constructor (
        private readonly dashboardService: DashboardService,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    public ngOnInit (): void {
        const paymentsStatistic: PaymentsGraphData = this.activatedRoute.snapshot.data[RoutingContract.Resolvers.PAYMENTS_STATISTIC];

        this.graphData = [
            {
                graphId: 'paymentsSumGraphId',
                tableName: 'Sum of payments',
                data: paymentsStatistic.sum,
            },
            {
                graphId: 'paymentsAmountGraphId',
                tableName: 'Amount of payments',
                data: paymentsStatistic.amount,
            },
            {
                graphId: 'userGraphId',
                tableName: 'Amount of users',
                data: paymentsStatistic.usersAmount,
            },
        ];
    }
}
