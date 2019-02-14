import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { UsersAmountGraphDataModel } from "../models/users-amount-graph-data.model";
import { PaymentsAmountGraphDataModel } from "../models/payments-amount-graph-data.model";
import { PaymentsSumGraphDataModel } from "../models/payments-sum-graph-data.model";

@Injectable()
export class DashboardService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getUsers (): Observable<UsersAmountGraphDataModel[]> {
        const url: string = `/${RoutingContract.API.Payment.BASE}/${RoutingContract.API.Payment.USERS_AMOUNT}`;

        return this.http.get<UsersAmountGraphDataModel[]>(url).pipe(
            map(res => {
                return res.map((item) => new UsersAmountGraphDataModel(item));
            }),
        );
    }

    public getPaymentsAmount (): Observable<PaymentsAmountGraphDataModel[]> {
        const url: string = `/${RoutingContract.API.Payment.BASE}/${RoutingContract.API.Payment.PAYMENTS_AMOUNT}`;

        return this.http.get<PaymentsAmountGraphDataModel[]>(url).pipe(
            map(res => {
                return res.map((item) => new PaymentsAmountGraphDataModel(item));
            }),
        );
    }

    public getPaymentsSum (): Observable<PaymentsSumGraphDataModel[]> {
        const url: string = `/${RoutingContract.API.Payment.BASE}/${RoutingContract.API.Payment.PAYMENTS_SUM}`;

        return this.http.get<PaymentsSumGraphDataModel[]>(url).pipe(
            map(res => {
                return res.map((item) => new PaymentsSumGraphDataModel(item));
            }),
        );
    }
}
