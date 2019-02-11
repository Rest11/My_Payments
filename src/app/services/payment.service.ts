import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoutingContract } from "../contracts/routing.contract";
import { PaymentTokenDto } from "../types/payment-token.dto";
import { DonationResponse } from "./types/donation.response";

@Injectable()
export class PaymentService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public sendPayment (paymentDto: PaymentTokenDto): Observable<DonationResponse> {
        const url: string = `/${RoutingContract.API.PAYMENT}/${RoutingContract.API.DONATION}`;

        return this.http.post<DonationResponse>(url, paymentDto);
    }
}
