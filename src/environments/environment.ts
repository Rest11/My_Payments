// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,

    restServerURL: 'http://localhost:3000',             // url of the API server side
    apiVersion: 'v1.0',                                 // API version
    auth: {                                             // credentials of authentication
        google: {                                       // google credentials of authentication (https://console.developers.google.com)
            clientID: '123456790',                          // client id of the app from the google account for developers
            providerID: '123456790',                        // provider id of the app from the google account for developers
        },
    },
    paymentCredentials: {                               // credentials of payment services
        stripe: {                                       // stripe credentials (https://dashboard.stripe.com/account/apikeys)
            publishKey: 'pk_test_123456',                   // publish API key of your account
        },
    },
};
