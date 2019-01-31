export namespace FormsContract {
    export abstract class Base {
        public static readonly FORM_ITSELF = 'formItself';
    }

    export abstract class SignIn extends Base {
        public static readonly EMAIL = 'email';
        public static readonly PASSWORD = 'password';
    }

    export abstract class User extends Base {
        public static readonly EMAIL = 'email';
        public static readonly DISPLAY_NAME = 'displayName';
    }
}
