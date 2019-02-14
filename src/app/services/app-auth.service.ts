import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from "rxjs";
import { delay, map } from "rxjs/operators";
import { UserModel } from '../models/user.model';
import { Storage } from '../utils/storage';
import { environment } from "../../environments/environment";
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { StorageAliases } from "../app.constants";
import { CheckingTokenModel } from "../models/checking-token.model";
import { UserService } from "./user.service";
import { EncodedTokenResponse } from "./types/encoded-token.response";

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
                const currentToken: TokenModel | null = this.userTokenFromStorage;

                this.saveUserDataIntoStorage(currentToken);
            });
        });
    }

    public get userGoogleToken (): string | null {
        try {
            if (this.auth2.isSignedIn.get()) return this.auth2.currentUser.get().getAuthResponse().id_token;
        } catch (err) {
            return null;
        }
    }

    public get userTokenFromStorage (): TokenModel {
        return this.tokenStorage.restoreAs(TokenModel);
    }

    public async getEncodedToken (token: string | null): Promise<TokenModel> {
        if (!token) return null;

        const googleTokenMode: TokenModel = new TokenModel({ currentToken: token });
        const encodedToken: EncodedTokenResponse =
            await this.http.post<TokenModel>(`/${RoutingContract.API.GET_TOKEN}`, googleTokenMode).toPromise();

        return new TokenModel(encodedToken);
    }

    public checkToken (currentToken: TokenModel): Observable<CheckingTokenModel> {
        return this.http.post<CheckingTokenModel>(`/${RoutingContract.API.AUTHENTICATE}`, currentToken).pipe(
            map(res => new CheckingTokenModel(res)),
        );
    }

    private saveTokenIntoStorage (token: TokenModel): TokenModel {
        this.tokenStorage.save(token);
        return token;
    }

    public signIn (): Promise<TokenModel | null> {
        return new Promise(async (resolve, reject) => {
            if (this.auth2.isSignedIn.get()) {
                const encodedToken: TokenModel = await this.getEncodedToken(this.userGoogleToken);
                const token: TokenModel = this.saveTokenIntoStorage(encodedToken);
                resolve(token);
            }

            this.auth2.isSignedIn.listen(async (signedIn) => {
                if (signedIn) {
                    const encodedToken: TokenModel = await this.getEncodedToken(this.userGoogleToken);
                    const token: TokenModel = this.saveTokenIntoStorage(encodedToken);
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

    public saveUserIntoStorage (userData: UserModel): void {
        this.userStorage.save(userData);
        this.userSubject.next(userData);
    }

    private saveUserDataIntoStorage (currentToken: TokenModel): void {
        if (!currentToken) return;

        this.userSubscription = this.userService.getUserData(currentToken).pipe(
            delay(0),
        ).subscribe((userData: UserModel) => {
            this.userStorage.save(userData);
            this.userSubject.next(userData);
            this.userSubscription.unsubscribe();
        });
    }
}
