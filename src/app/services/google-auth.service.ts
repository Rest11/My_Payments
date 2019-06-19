/*
    NOTE:
    We do not want to use refresh token because Google sends you refreshing token if a mode was set "offline" and only once.
    Because Google passes a refresh token only at the time when the user authorizes your application via a consent screen.
    After that when the user tries to login again, he will not see the consent screen.
    No consent means no refresh token passed by Google.
    Google does not recommend it because users are able to permit access to there accounts by themselves (sign in).
 */

import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class GoogleAuthService {
    private auth2: any;

    constructor () {}

    public init (): Promise<void> {
        return new Promise((resolve, reject) => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: environment.auth.google.clientID,
                    cookiepolicy: 'single_host_origin',
                    scope: 'profile',
                    fetch_basic_profile: true,
                }).then((auth2) => {
                    this.auth2 = auth2;
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }

    private get userGoogleToken (): string | null {
        try {
            if (this.auth2.isSignedIn.get()) return this.auth2.currentUser.get().getAuthResponse().id_token;
        } catch (err) {
            return null;
        }
    }

    public signIn (): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.auth2.isSignedIn.get()) {
                resolve(this.userGoogleToken);
                return;
            }

            this.auth2.isSignedIn.listen((signedIn) => {
                if (signedIn) resolve(this.userGoogleToken);
                else reject(null);
            });

            this.auth2.signIn();
        });
    }

    public signOut (): void {
        this.auth2.isSignedIn.listen(null);
        this.auth2.signOut();
    }
}
