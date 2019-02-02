import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RoutingContract } from "../contracts/routing.contract";
import { UserTokenDto } from "../types/user-token-dto";

@Injectable()
export class UserService {
    constructor (
        private readonly http: HttpClient,
    ) {}

    public saveUserData (userToken: UserTokenDto): Observable<any> { // TODO: any
        return this.http.post<void>(`/${RoutingContract.API.USER}`, userToken);
    }
}
