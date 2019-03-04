import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RoutingContract } from "../contracts/routing.contract";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public getUserData (): Observable<UserModel> {
        return this.http.get<UserModel>(`/${RoutingContract.API.USER}`).pipe(
            map(res => new UserModel(res)),
        );
    }
}
