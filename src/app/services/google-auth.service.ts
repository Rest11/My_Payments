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

            this.auth2.isSignedIn.listen(async (signedIn) => {
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
