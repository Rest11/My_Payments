import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { UserModel } from '../models/user.model';
import { Storage } from '../utils/storage';
import { RoutingContract } from "../contracts/routing.contract";
import { TokenModel } from "../models/token.model";
import { AuthPlatform, NotificationMessage, StorageAliases } from "../app.constants";
import { CheckingTokenModel } from "../models/checking-token.model";
import { UserService } from "./user.service";
import { EncodedTokenResponse } from "./types/encoded-token.response";
import { GoogleAuthService } from "./google-auth.service";
import { AuthPlatformModel } from "../models/auth-platform.model";
import { FacebookAuthService } from "./facebook-auth.service";

@Injectable()
export class AppAuthService {
    public userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel>(null);
    public authPlatformSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    private userStorage: Storage<UserModel>;
    private tokenStorage: Storage<TokenModel>;
    private authPlatformStorage: Storage<AuthPlatformModel>;

    constructor (
        private readonly http: HttpClient,
        private readonly googleAuthService: GoogleAuthService,
        private readonly facebookAuthService: FacebookAuthService,
        private readonly userService: UserService,
        private readonly toastr: ToastrService,
    ) {
        this.tokenStorage = new Storage<TokenModel>(StorageAliases.TOKEN);
        this.userStorage = new Storage<UserModel>(StorageAliases.USER);
        this.authPlatformStorage = new Storage<AuthPlatformModel>(StorageAliases.AUTH_PLATFORM);

        const currentToken: TokenModel | null = this.userTokenFromStorage;

        this.googleAuthService.init()
            .then(() => {
                this.saveUserDataIntoStorage(currentToken);
            });

        this.facebookAuthService.init();
    }

    private async getEncodedToken (token: string | null): Promise<TokenModel> {
        if (!token) return null;

        const foreignToken: TokenModel = new TokenModel({ currentToken: token });
        const encodedToken: EncodedTokenResponse =
            await this.http.post<TokenModel>(`/${RoutingContract.API.GET_TOKEN}`, foreignToken).toPromise();

        return new TokenModel(encodedToken);
    }

    private saveTokenIntoStorage (token: TokenModel): TokenModel {
        this.tokenStorage.save(token);
        return token;
    }

    private saveUserDataIntoStorage (currentToken: TokenModel): void {
        if (!currentToken) return;

        this.userService.getUserData().subscribe(
            (userData: UserModel) => {
                this.userStorage.save(userData);
                this.userSubject.next(userData);
            },
            () => {
                this.toastr.error(NotificationMessage.NOT_AUTHENTICATED);
            },
        );
    }

    public async signIn (authPlatform: string): Promise<TokenModel | null> {
        let foreignToken: string;

        switch (authPlatform) {
            case AuthPlatform.GOOGLE:
                foreignToken = await this.googleAuthService.signIn();
                break;
            case AuthPlatform.FACEBOOK:
                foreignToken = await this.facebookAuthService.signIn();
                break;
        }

        const encodedToken: TokenModel = await this.getEncodedToken(foreignToken);

        this.saveTokenIntoStorage(encodedToken);
        this.authPlatformSubject.next(authPlatform);
        this.authPlatformStorage.save(new AuthPlatformModel({ authPlatform }));

        return encodedToken;
    }

    public signOut (): void {
        switch (this.authPlatformSubject.getValue()) {
            case AuthPlatform.GOOGLE:
                this.googleAuthService.signOut();
                break;
            case AuthPlatform.FACEBOOK:
                this.facebookAuthService.signOut();
                break;
        }

        this.tokenStorage.clear();
        this.userStorage.clear();
        this.authPlatformStorage.clear();
    }

    public saveUserIntoStorage (userData: UserModel): void {
        this.userStorage.save(userData);
        this.userSubject.next(userData);
    }

    public get userTokenFromStorage (): TokenModel {
        return this.tokenStorage.restoreAs(TokenModel);
    }

    public get authPlatformFromStorage (): AuthPlatformModel {
        return this.authPlatformStorage.restoreAs(AuthPlatformModel);
    }

    public checkToken (): Observable<CheckingTokenModel> {
        return this.http.get<CheckingTokenModel>(`/${RoutingContract.API.AUTHENTICATE}`).pipe(
            map(res => new CheckingTokenModel(res)),
        );
    }
}
