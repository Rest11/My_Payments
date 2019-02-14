import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Elements, ElementsOptions, StripeService, Element as StripeElement, TokenResult, Token } from "ngx-stripe";
import { BehaviorSubject } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { DONATION_CONTROLS_CONFIG } from "./form-config";
import { FormsContract } from "../../contracts/forms.contract";
import { CommonComponent } from "../../classes/common-component";
import { SubscriptionsContract } from "../../contracts/subscriptions.contract";
import { Card, PaymentConstants } from "../../app.constants";
import { PaymentService } from "../../services/payment.service";
import { PaymentTokenDto } from "../../types/payment-token.dto";
import { RoutingContract } from "../../contracts/routing.contract";

@Component({
    selector: 'donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationComponent extends CommonComponent implements AfterViewInit {
    public readonly donationForm: FormGroup;
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public readonly PaymentConstants: typeof PaymentConstants = PaymentConstants;
    public readonly Card: typeof Card = Card;
    public cardErrorMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public isFormHasError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isInProcessing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private elements: Elements;
    private card: StripeElement;

    constructor (
        private readonly formBuilder: FormBuilder,
        private readonly stripeService: StripeService,
        private readonly paymentService: PaymentService,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) {
        super();
        this.donationForm = this.formBuilder.group(DONATION_CONTROLS_CONFIG);
    }

    public ngAfterViewInit (): void {
        const paymentOptions: ElementsOptions = {
            locale: 'auto',
        };

        this.updateSubscription(
            SubscriptionsContract.Donation.PAYMENT_CARD,
            this.stripeService.elements(paymentOptions).subscribe(
                (elements: Elements) => {
                    this.elements = elements;

                    if (this.card) return;

                    this.card = this.elements.create('card', {
                        style: Card.STYLES,
                    });
                    this.card.mount(`#${Card.ID_CARD_ELEMENT}`);
                    this.cardChangesHandler(this.card);
                },
            ),
        );
    }

    private cardChangesHandler (card: StripeElement): void {
        card.on('change', (event) => {
            if (event.error || event.empty) {
                this.isFormHasError.next(true);
                event.error
                    ? this.cardErrorMessage.next(event.error.message)
                    : this.cardErrorMessage.next(null);

                return;
            }

            this.cardErrorMessage.next(null);
            this.isFormHasError.next(false);
        });
    }

    public submitPayment (): void {
        if (this.donationForm.invalid) return;

        this.cardErrorMessage.next(null);
        this.isInProcessing.next(true);

        this.updateSubscription(
            SubscriptionsContract.Donation.MAKE_PAYMENT,
            this.stripeService.createToken(this.card, undefined).pipe(
                map((result: TokenResult) => {
                    if (result.error) {
                        this.isFormHasError.next(true);
                        this.toastr.error(result.error.message);
                        return false;
                    }

                    this.isFormHasError.next(false);
                    return result.token;
                }),
                filter((token: Token | boolean) => !!token),
                switchMap((token: Token) => {
                    const paymentDto: PaymentTokenDto = {
                        stripeTokenId: token.id,
                        amountPayment: this.donationForm.value[FormsContract.Donation.AMOUNT],
                        description: this.donationForm.value[FormsContract.Donation.DESCRIPTION],
                    };

                    return this.paymentService.sendPayment(paymentDto);
                }),
            ).subscribe(
                () => {
                    this.toastr.success('The payment was successful');
                    this.router.navigateByUrl(`/${RoutingContract.AdminLayout.TRANSACTIONS}`);
                },
                (err) => {
                    const errMessage: string = err.error.message || err.message;
                    this.toastr.error(errMessage);
                    this.cardErrorMessage.next(errMessage);
                    this.isInProcessing.next(false);
                },
                () => {
                    this.isInProcessing.next(false);
                },
            ),
        );
    }
}
