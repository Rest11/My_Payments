import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { UsersAmountGraphDataModel } from "../models/users-amount-graph-data.model";
import { PaymentsAmountGraphDataModel } from "../models/payments-amount-graph-data.model";
import { PaymentsSumGraphDataModel } from "../models/payments-sum-graph-data.model";
import { PaymentsGraphData } from "./types/payments-graph-data";

@Injectable()
export class DashboardService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getPaymentsStatistic (): Promise<PaymentsGraphData> {
        const url: string = `/${RoutingContract.API.Payment.BASE}/${RoutingContract.API.Payment.STATISTIC}`;

        return this.http.get<PaymentsGraphData>(url).pipe(
            map((res) => {
                return {
                    sum: res.sum.map(item => new PaymentsSumGraphDataModel(item)),
                    amount: res.amount.map(item => new PaymentsAmountGraphDataModel(item)),
                    usersAmount: res.usersAmount.map(item => new UsersAmountGraphDataModel(item)),
                };
            }),
        ).toPromise();
    }
}
