import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpParamsOptions } from "@angular/common/http/src/params";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { CollectionDto } from "./types/collection.dto";
import { CollectionResponse } from "../types/collection.response";
import { PaymentModel } from "../models/payment.model";
import { PrettyDatePipe } from "../pipes/pretty-date.pipe";

@Injectable()
export class TransactionService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getTransactions (dto: CollectionDto): Observable<CollectionResponse<PaymentModel>> {
        const url: string = `/${RoutingContract.API.TRANSACTIONS}`;
        const paramsOptions: HttpParamsOptions = { fromObject: dto };
        const params: HttpParams = new HttpParams(paramsOptions);
        const options = { params };

        return this.http.get<CollectionResponse<PaymentModel>>(url, options).pipe(
            map((collection: CollectionResponse<PaymentModel>) => {
                return {
                    items: collection.items.map((data: any) => {
                        data.createdAt = new PrettyDatePipe().transform(data.createdAt, 'MM.DD.YYYY HH:mm');
                        return new PaymentModel(data);
                    }),
                    total: collection.total,
                };
            }),
        );
    }
}
