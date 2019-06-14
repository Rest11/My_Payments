import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { DashboardService } from "../../../services/dashboard.service";
import { PaymentsGraphData } from "../../../services/types/payments-graph-data";

@Injectable()
export class PaymentsStatisticResolver implements Resolve<PaymentsGraphData> {
    constructor (
        private readonly dashboardService: DashboardService,
    ) {}

    public resolve (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<PaymentsGraphData> {
        return this.dashboardService.getPaymentsStatistic();
    }
}
