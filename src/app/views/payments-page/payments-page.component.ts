import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { StripeService, Token } from "ngx-stripe";
import { ToastrService } from "ngx-toastr";
import { CommonComponent } from "../../classes/common-component";
import { FormsContract } from "../../contracts/forms.contract";
import { PaymentConstants } from "../../app.constants";
import { StripeCardComponent } from "../../components/stripe-card/stripe-card.component";
import { PaymentService } from "../../services/payment.service";
import { SubscriptionsContract } from "../../contracts/subscriptions.contract";
import { PaymentDto } from "../../types/payment.dto";
import { RoutingContract } from "../../contracts/routing.contract";
import { PAYMENT_CONTROLS_CONFIG } from "./form-config";

@Component({
    selector: 'payments-page',
    templateUrl: './payments-page.component.html',
    styleUrls: ['./payments-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPageComponent extends CommonComponent {
    public readonly donationForm: FormGroup;
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public readonly PaymentConstants: typeof PaymentConstants = PaymentConstants;
    public cardErrorMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public isFormHasError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isInProcessing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @ViewChild('stripeCard')
    private stripeCard: StripeCardComponent;

    constructor (
        private readonly formBuilder: FormBuilder,
        private readonly stripeService: StripeService,
        private readonly paymentService: PaymentService,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) {
        super();
        this.donationForm = this.formBuilder.group(PAYMENT_CONTROLS_CONFIG);
    }

    public cardError (event: boolean): void {
        this.isFormHasError.next(event);
    }

    public submitPayment (): void {
        if (this.donationForm.invalid) return;

        this.cardErrorMessage.next(null);
        this.isInProcessing.next(true);

        this.updateSubscription(
            SubscriptionsContract.Stripe.MAKE_PAYMENT,
            this.stripeCard.getPaymentToken().pipe(
                switchMap((token: Token) => {
                    const paymentDto: PaymentDto = {
                        stripeTokenId: token.id,
                        amountPayment: this.donationForm.value[FormsContract.Donation.AMOUNT],
                        description: this.donationForm.value[FormsContract.Donation.DESCRIPTION],
                    };

                    return this.paymentService.sendPayment(paymentDto);
                }),
            ).subscribe(
                () => {
                    this.toastr.success('The payment has been successful');
                    this.router.navigateByUrl(`/${RoutingContract.AdminLayout.TRANSACTIONS}`);
                },
                (err) => {
                    const errMessage: string = err.error.message || err.message;

                    this.toastr.error(errMessage);
                    this.cardErrorMessage.next(errMessage);
                    this.isFormHasError.next(true);
                    this.isInProcessing.next(false);
                },
                () => {
                    this.isInProcessing.next(false);
                },
            ),
        );
    }
}
