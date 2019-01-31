import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { Storage } from '../utils/storage';
import { AuthService, AuthServiceConfig, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { environment } from "../../environments/environment";
import { SocialNetwork } from "../app.constants";
import { ServerError } from "../types/server-error";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs/observable/of";
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AppAuthService {
    private readonly USER_STORAGE_ALIAS: string = 'user';
    private storage: Storage<UserModel>;
    private readonly socialNetwork: typeof SocialNetwork = SocialNetwork;

    public readonly userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel>(null);

    public static provideConfig (): AuthServiceConfig {
        return new AuthServiceConfig([
            {
                id: environment.auth.google.providerID,
                provider: new GoogleLoginProvider(environment.auth.google.clientID),
            },
            /*{
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider("Facebook-App-Id"),
            },*/
        ]);
    }

    constructor (
        // private readonly http: HttpClient,
        private readonly authService: AuthService,
        private readonly toastr: ToastrService,
    ) {
        this.checkAuth().subscribe();
    }

    private saveUser (userData: SocialUser): void {
        const newUser: UserModel = new UserModel({
            idNetwork: userData.id,
            email: userData.email,
            displayName: userData.name,
            avatar: userData.photoUrl,
            currentToken: userData.authToken,
        });

        this.userSubject.next(newUser);
    }

    public async signIn (network: string): Promise<void> {
        switch (network) {
            case this.socialNetwork.GOOGLE:
                console.log('~~~~~~~~~~socialNetwork.GOOGLE- - ~~~~~~~~~~\n',);
                await this.authService.signIn(environment.auth.google.providerID);
                break;
            /*case this.socialNetwork.FACEBOOK:
                await this.authService.signIn(environment.auth.facebook.providerID);
                break;*/

        }
    }

    private handleSignInFailure (response: HttpErrorResponse): void {
        const error: ServerError = response.error;
        this.toastr.error(error.message);
    }

    public checkAuth (): Observable<void | SocialUser> {
        return this.authService.authState.pipe(
            catchError(err => {
                this.handleSignInFailure(err);
                return empty();
            }),
            tap((userData: SocialUser | null) => {
                console.log('~~~~~~~~~~checkAuth- - userData~~~~~~~~~~\n', userData);
                if (!userData) return this.userSubject.next(null);

                this.saveUser(userData);
                return of(userData);
            }),
        );
    }

    public async signOut (): Promise<void> {
        // await this.authService.signOut();
        this.userSubject.next(null);
        localStorage.clear();
        /*return this.http.delete<void>(url)
            .pipe(
                tap(() => {
                    this.storage.clear();
                    this.userSubject.next(null);
                }),
            );*/
    }
}
