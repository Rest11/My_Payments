import { Validators } from '@angular/forms';
import { FormsContract } from "../../contracts/forms.contract";

export const SUBSCRIPTION_CONTROLS_CONFIG = {
    [FormsContract.Subscription.PLAN]: [
        1, [
            Validators.required,
        ],
    ],
};
