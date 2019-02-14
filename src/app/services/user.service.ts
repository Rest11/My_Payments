import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getUserData (userToken: TokenModel): Observable<UserModel> {
        return this.http.post<UserModel>(`/${RoutingContract.API.USER}`, userToken).pipe(
            map(res => new UserModel(res)),
        );
    }
}
