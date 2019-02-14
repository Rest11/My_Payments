import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { PaymentTokenDto } from "../types/payment-token.dto";
import { MakeDonationModel } from "../models/make-donation.model";

@Injectable()
export class PaymentService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public sendPayment (paymentDto: PaymentTokenDto): Observable<MakeDonationModel> {
        const url: string = `/${RoutingContract.API.Payment.BASE}/${RoutingContract.API.Payment.DONATION}`;

        return this.http.post<MakeDonationModel>(url, paymentDto).pipe(
            map(res => new MakeDonationModel(res)),
        );
    }
}
