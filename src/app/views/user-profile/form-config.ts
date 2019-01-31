import { FormsContract } from '../../contracts/forms.contract';
import { Validators } from '@angular/forms';

export const PERSONAL_SETTINGS_CONTROLS_CONFIG = {
    [FormsContract.User.EMAIL]: [
        '', [
            Validators.required,
            Validators.email,
        ],
    ],
    [FormsContract.User.DISPLAY_NAME]: [
        '', [
            Validators.required,
        ],
    ],
};
