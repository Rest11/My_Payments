import { Validators } from '@angular/forms';
import { FormsContract } from "../../contracts/forms.contract";
import { PaymentConstants } from "../../app.constants";

export const DONATION_CONTROLS_CONFIG = {
    [FormsContract.Donation.AMOUNT]: [
        1, [
            Validators.required,
            Validators.max(PaymentConstants.Amount.MAX),
            Validators.min(PaymentConstants.Amount.MIN),
        ],
    ],
    [FormsContract.Donation.DESCRIPTION]: [
        '', [
            Validators.required,
            Validators.maxLength(PaymentConstants.MAX_TEXT_LENGTH),
        ],
    ],
};
