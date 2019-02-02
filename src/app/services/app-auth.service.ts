import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel } from '../models/user.model';
import { Storage } from '../utils/storage';
import { environment } from "../../environments/environment";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { StorageAliases } from "../app.constants";
import { CheckingTokenResponse } from "../types/checking-token.response";

@Injectable()
export class AppAuthService {
    public auth2: any;
    private storage: Storage<TokenModel>;

    // TODO: get user data from DB
    public userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel>(null);

    constructor (
        private readonly http: HttpClient,
    ) {
        this.storage = new Storage<TokenModel>(StorageAliases.TOKEN);

        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: environment.auth.google.clientID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile',
                fetch_basic_profile: true,
            }).then((auth2) => {
                this.auth2 = auth2;

                const token: TokenModel = new TokenModel({
                    currentToken: this.getUserToken,
                });

                this.storage.save(token);
            });
        });
    }

    public get getUserToken (): string | null {
        try {
            if (this.auth2.isSignedIn.get()) return this.auth2.currentUser.get().getAuthResponse().id_token;
        } catch (err) {
            return null;
        }
    }

    public get getUserTokenFromStorage (): TokenModel {
        return this.storage.restoreAs(TokenModel);
    }

    // TODO: check param "network"
    public signIn (network: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth2.isSignedIn.get()) resolve();

            this.auth2.isSignedIn.listen(signedIn => {
                if (signedIn) {
                    const token: TokenModel = new TokenModel({
                        currentToken: this.getUserToken,
                    });

                    this.storage.save(token);
                    resolve();
                } else {
                    reject();
                }
            });

            this.auth2.signIn();
        });
    }

    public signOut (): void {
        this.auth2.isSignedIn.listen(null);
        this.auth2.signOut();
        this.storage.clear();
        console.log('~~~~~~~~~~- - signOut~~~~~~~~~~\n', this.getUserToken);
    }

    public checkToken (currentToken: TokenModel): Observable<CheckingTokenResponse> {
        return this.http.post<CheckingTokenResponse>(`/${RoutingContract.API.AUTHENTICATE}`, currentToken);
    }
}
