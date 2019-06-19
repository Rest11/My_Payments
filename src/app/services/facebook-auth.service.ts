/*
    NOTE:
    Facebook SDK does not have a refresh token. A common access token is valid for about 2 hours.
    This is short-life token and you can not refresh it.
    It will be refreshed automatically if a user will use Facebook API.
    On the server-side we can generate long-life token that will be available for 60 days.
    It will be refreshed every day if a user will use Facebook API.

    But this application does not use Facebook API except signIn/signOut so access token never will be refreshed.
    So we have to use only a short-life token that will be expired in 2 hours.
 */

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
