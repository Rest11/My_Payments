export namespace NotificationMessage {
    export const NOT_AUTHENTICATED = 'User is not authorized';
}

export namespace StorageAliases {
    export const TOKEN = 'token';
    export const USER = 'user';
    export const AUTH_PLATFORM = 'auth-platform';
}

export namespace PaymentConstants {
    export const MAX_TEXT_LENGTH = 50;
    export namespace Amount {
        export const MIN = 1;
        export const MAX = 15;
    }

}
export namespace AuthPlatform {
    export const GOOGLE = 'google';
    export const FACEBOOK = 'facebook';
}

export namespace FacebookLoginStatus {
    export const AUTHORIZATION_EXPIRED = 'authorization_expired';
    export const CONNECTED = 'connected';
    export const NOT_AUTHORIZED = 'not_authorized';
    export const UNKNOWN = 'unknown';
}

export namespace Card {
    export namespace Stripe {
        export const ID_CARD_ELEMENT = 'stripe-card-element';
        export const STYLES = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '18px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa2a21',
                iconColor: '#fa755a',
            },
        };
    }
}

export const DEFAULT_DATE_FORMAT = 'DD MMMM YYYY';

export namespace PaymentSubscriptionStatus {
    export const ACTIVE = 'active';
    export const PAST_DUE = 'past_due';
    export const CANCELED = 'canceled';
    export const UNPAID = 'unpaid';
}
