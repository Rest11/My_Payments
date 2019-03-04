import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { FacebookLoginStatus } from "../app.constants";

@Injectable()
export class FacebookAuthService {
    constructor () {}

    public init (): void {
        FB.init({
            appId: environment.auth.facebook.appID,
            cookie: true,
            xfbml: true,
            version: environment.auth.facebook.versionAPI,
        });
    }

    public signIn (): Promise<string> {
        return new Promise((resolve, reject) => {
            const userFields: string = 'email';

            FB.login(
                (response) => {
                    if (response.status !== FacebookLoginStatus.CONNECTED) {
                        reject(null);
                        return;
                    }
                    resolve(response.authResponse.accessToken);
                },
                {
                    scope: userFields,
                },
            );
        });
    }

    public signOut (): void {
        FB.logout();
    }
}
