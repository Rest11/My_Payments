import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { UserModel } from '../models/user.model';
import { Storage } from '../utils/storage';
import { environment } from "../../environments/environment";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { StorageAliases } from "../app.constants";
import { CheckingTokenResponse } from "../types/checking-token.response";
import { UserService } from "./user.service";

@Injectable()
export class AppAuthService {
    private tokenStorage: Storage<TokenModel>;
    private userStorage: Storage<UserModel>;
    private userSubscription: Subscription;

    public auth2: any;
    public userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel>(null);

    constructor (
        private readonly http: HttpClient,
        private readonly userService: UserService,
    ) {
        this.tokenStorage = new Storage<TokenModel>(StorageAliases.TOKEN);
        this.userStorage = new Storage<UserModel>(StorageAliases.USER);

        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: environment.auth.google.clientID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile',
                fetch_basic_profile: true,
            }).then((auth2) => {
                this.auth2 = auth2;
                const currentToken: string | null = this.getUserToken;

                this.saveTokenIntoStorage(currentToken);
                this.saveUserDataIntoStorage(currentToken);
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
        return this.tokenStorage.restoreAs(TokenModel);
    }

    public signIn (): Promise<TokenModel | null> {
        return new Promise((resolve, reject) => {
            if (this.auth2.isSignedIn.get()) {
                const token: TokenModel = this.saveTokenIntoStorage(this.getUserToken);
                resolve(token);
            }

            this.auth2.isSignedIn.listen(signedIn => {
                if (signedIn) {
                    const token: TokenModel = this.saveTokenIntoStorage(this.getUserToken);
                    resolve(token);
                } else {
                    reject(null);
                }
            });

            this.auth2.signIn();
        });
    }

    public signOut (): void {
        this.auth2.isSignedIn.listen(null);
        this.auth2.signOut();
        this.tokenStorage.clear();
        this.userStorage.clear();
    }

    public checkToken (currentToken: TokenModel): Observable<CheckingTokenResponse> {
        return this.http.post<CheckingTokenResponse>(`/${RoutingContract.API.AUTHENTICATE}`, currentToken);
    }

    private saveTokenIntoStorage (token: string): TokenModel {
        const tokenModel: TokenModel = new TokenModel({
            currentToken: token,
        });
        this.tokenStorage.save(tokenModel);

        return tokenModel;
    }

    public saveUserIntoStorage (userData: UserModel): void {
        this.userStorage.save(userData);
        this.userSubject.next(userData);
    }

    private saveUserDataIntoStorage (currentToken: string): void {
        const tokenModel: TokenModel = new TokenModel({
            currentToken,
        });

        this.userSubscription = this.userService.getUserData(tokenModel).pipe(
            delay(0),
        ).subscribe((userData: UserModel) => {
            this.userStorage.save(userData);
            this.userSubject.next(userData);
            this.userSubscription.unsubscribe();
        });
    }
}
