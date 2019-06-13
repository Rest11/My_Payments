import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoutingContract } from "../contracts/routing.contract";
import { SubscriptionPlansModel } from "../models/subscription-plans.model";
import { PaymentSubscriptionDto } from "../types/payment-subscription.dto";
import { CurrentSubscriptionModel } from "../models/current-subscription.model";

@Injectable()
export class SubscriptionService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getSubscriptionPlans (): Observable<SubscriptionPlansModel[]> {
        const url: string = `/${RoutingContract.API.SUBSCRIPTION}`;

        return this.http.get<SubscriptionPlansModel[]>(url);
    }

    public createSubscription (dto: PaymentSubscriptionDto): Observable<CurrentSubscriptionModel> {
        const url: string = `/${RoutingContract.API.SUBSCRIPTION}`;

        return this.http.post<CurrentSubscriptionModel>(url, dto);
    }

    public getCurrentSubscriptions (): Observable<CurrentSubscriptionModel | null> {
        const url: string = `/${RoutingContract.API.SUBSCRIPTION}/current`;

        return this.http.get<CurrentSubscriptionModel | null>(url);
    }

    public cancelSubscription (subscriptionID: string): Observable<void> {
        const url: string = `/${RoutingContract.API.SUBSCRIPTION_CANCEL}/${subscriptionID}`;

        return this.http.get<void>(url);
    }
}
