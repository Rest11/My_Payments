/*
NOTE #1:
```
    resolve: {
        [SOME_CONSTANT]: SomeResolver, // <-- you can't do this
    },
```
Look this issue(https://github.com/angular/angular-cli/issues/4686) for details
*/

export namespace RoutingContract {
    export namespace AdminLayout {
        export const DASHBOARD = 'dashboard';
        export const USER_PROFILE = 'profile';
        export const SIGN_IN = 'sign-in';
        export const TRANSACTIONS = 'transactions';
        export const PAYMENTS = 'payments';
        export const SUBSCRIPTION = 'subscription';
    }

    export namespace Resolvers {
        export const PAYMENTS_STATISTIC = 'paymentsStatistic';
    }

    export namespace API {
        export const USER = 'user';
        export const AUTHENTICATE = 'authenticate';
        export const GET_TOKEN = `${RoutingContract.API.AUTHENTICATE}/get-token`;
        export const TRANSACTIONS = 'transactions';
        export const SUBSCRIPTION = 'subscription';
        export const SUBSCRIPTION_CANCEL = `${RoutingContract.API.SUBSCRIPTION}/cancel`;

        export namespace Payment {
            export const BASE = 'payment';
            export const DONATION = 'donation';
            export const STATISTIC = 'statistic';
        }
    }
}
